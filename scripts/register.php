<?php
define('APP_INIT', true);

header('Content-Type: application/json');

require_once __DIR__ . '/key.php';

/*
 * Decode hex string to normal string
 */
function hexToString(string $hex): string
{
    $str = '';
    for ($i = 0; $i < strlen($hex); $i += 2) {
        $str .= chr(hexdec(substr($hex, $i, 2)));
    }
    return $str;
}

/*
 * Block SQL keywords and dangerous identifiers
 */
function isProhibitedUsername(string $username): bool
{
    $reserved = [
        'select','insert','update','delete','drop','truncate',
        'alter','create','replace','union','where','from','join',
        'into','table','database','schema',
        'exec','execute','call',
        'grant','revoke',
        'sleep','benchmark',
        'outfile','load_file',
        'or','and'
    ];

    return in_array(strtolower($username), $reserved, true);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        throw new Exception('Invalid JSON input');
    }

    $hexPhone    = $input['001'] ?? null;
    $hexEmail    = $input['002'] ?? null;
    $hexPassword = $input['003'] ?? null;
    $hexUsername = $input['004'] ?? null;
    $hexPin      = $input['005'] ?? null;

    if (!$hexPhone || !$hexEmail || !$hexPassword || !$hexUsername || !$hexPin) {
        throw new Exception('Missing required fields');
    }

    $phone    = hexToString($hexPhone);
    $email    = hexToString($hexEmail);
    $password = hexToString($hexPassword);
    $username = hexToString($hexUsername);
    $pin      = hexToString($hexPin);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email');
    }

    if (!preg_match('/^\+?\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone number');
    }

    if (strlen($username) < 3) {
        throw new Exception('Username too short');
    }

    if (isProhibitedUsername($username)) {
        throw new Exception('Username prohibited, use a different username');
    }

    if (strlen($password) < 6) {
        throw new Exception('Password too short');
    }

    if (!preg_match('/^\d{4,6}$/', $pin)) {
        throw new Exception('PIN must be 4–6 digits');
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $hashedPin      = password_hash($pin, PASSWORD_DEFAULT);

    $pdo->exec("USE `" . DB_NAME . "`");

    $stmt = $pdo->prepare("SELECT id FROM users WHERE phone = :phone");
    $stmt->execute(['phone' => $phone]);
    if ($stmt->fetch()) {
        echo json_encode([
            'status'  => 'error',
            'message' => 'Phone already registered'
        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    if ($stmt->fetch()) {
        echo json_encode([
            'status'  => 'error',
            'message' => 'Username is taken'
        ]);
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO users (
            username,
            email,
            phone,
            password,
            pin,
            status
        ) VALUES (
            :username,
            :email,
            :phone,
            :password,
            :pin,
            'inactive'
        )
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
