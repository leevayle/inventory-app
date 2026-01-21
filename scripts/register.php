<?php
header('Content-Type: application/json');

$DB_HOST = 'localhost';
$DB_NAME = 'swift_pos_invent';
$DB_USER = 'root';
$DB_PASS = '';

function hexToString($hex) {
    $str = '';
    for ($i = 0; $i < strlen($hex); $i += 2) {
        $str .= chr(hexdec(substr($hex, $i, 2)));
    }
    return $str;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        throw new Exception("Invalid JSON input");
    }

    // Get the hex values
    $hexPhone    = $input['001'] ?? null;
    $hexEmail    = $input['002'] ?? null;
    $hexPassword = $input['003'] ?? null;
    $hexUsername = $input['004'] ?? null;
    $hexPin      = $input['005'] ?? null;

    if (!$hexPhone || !$hexEmail || !$hexPassword || !$hexUsername || !$hexPin) {
        throw new Exception("Missing required fields");
    }

    // Convert hex back to string
    $phone    = hexToString($hexPhone);
    $email    = hexToString($hexEmail);
    $password = hexToString($hexPassword);
    $username = hexToString($hexUsername);
    $pin      = hexToString($hexPin);

    // Validate
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email");
    }

    if (!preg_match('/^\+?\d{10,15}$/', $phone)) {
        throw new Exception("Invalid phone number");
    }

    if (strlen($username) < 3) {
        throw new Exception("Username too short");
    }

    if (strlen($password) < 6) {
        throw new Exception("Password too short");
    }

    if (!preg_match('/^\d{4,6}$/', $pin)) {
        throw new Exception("PIN must be 4-6 digits");
    }

    // Hash password + pin
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $hashedPin      = password_hash($pin, PASSWORD_DEFAULT);

    // DB connection
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // 1) Check if phone exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE phone = :phone");
    $stmt->execute(['phone' => $phone]);

    if ($stmt->fetch()) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Phone already registered'
        ]);
        exit;
    }

    // 2) Check if username exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);

    if ($stmt->fetch()) {
        echo json_encode([
            'status' => 'error',
            'message' => 'username is taken'
        ]);
        exit;
    }

    // 3) Insert user
    $stmt = $pdo->prepare("
        INSERT INTO users (username, email, phone, password, pin, status)
        VALUES (:username, :email, :phone, :password, :pin, 'active')
    ");

    $stmt->execute([
        'username' => $username,
        'email'    => $email,
        'phone'    => $phone,
        'password' => $hashedPassword,
        'pin'      => $hashedPin
    ]);

    echo json_encode([
        'status'  => 'success',
        'message' => 'User registered successfully'
    ]);

} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
