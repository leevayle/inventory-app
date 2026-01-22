<?php
header('Content-Type: application/json');

$DB_HOST = 'localhost';
$DB_NAME = 'swift_pos_invent';
$DB_USER = 'root';
$DB_PASS = '';

function hexToString(string $hex): string {
    if (!ctype_xdigit($hex)) {
        throw new Exception('Invalid hex payload');
    }

    $str = '';
    for ($i = 0; $i < strlen($hex); $i += 2) {
        $str .= chr(hexdec(substr($hex, $i, 2)));
    }
    return $str;
}

/**
 * Very basic SQL injection pattern detection
 * (prepared statements already protect you,
 * this is just early rejection / hygiene)
 */
function looksLikeInjection(string $value): bool {
    return preg_match(
        '/(\b(select|insert|update|delete|drop|union|--|\#|;)\b)/i',
        $value
    );
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (
        !$input ||
        empty($input['username']) ||
        empty($input['password'])
    ) {
        throw new Exception('Invalid payload');
    }

    // Decode hex
    $username = hexToString($input['username']);
    $password = hexToString($input['password']);

    // Trim input
    $username = trim($username);

    // Username rules
    if (strlen($username) > 15) {
        echo json_encode(['error' => 'Username too long']);
        exit;
    }

    if (looksLikeInjection($username) || looksLikeInjection($password)) {
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    // DB connection
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Fetch user
    $stmt = $pdo->prepare("
        SELECT id, password, status, role, phone
        FROM users
        WHERE username = :username
        LIMIT 1
    ");
    $stmt->execute(['username' => $username]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['error' => "User doesn't exist"]);
        exit;
    }

    // Verify password (hashed in DB)
    if (!password_verify($password, $user['password'])) {
        echo json_encode(['error' => 'Wrong password']);
        exit;
    }

    // Check account status
    if ($user['status'] !== 'active') {
        echo json_encode(['error' => 'User inactive']);
        exit;
    }

    // SUCCESS
    echo json_encode([
        'success' => true,
        'role'    => $user['role'],
        'phone'   => bin2hex($user['phone']) // keep frontend hex-consistent
    ]);

} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Authentication failed'
    ]);
}
