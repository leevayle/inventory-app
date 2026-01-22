<?php
// Define the constant required by key.php
define('APP_INIT', true);

// Set header for JSON response
header('Content-Type: application/json');

// Include the database connection file
// This provides the $pdo object and DB constants
require_once __DIR__ . '/key.php';

/**
 * Helper: Convert Hex to String
 */
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
 * Helper: Basic SQL injection pattern detection
 */
function looksLikeInjection(string $value): bool {
    return preg_match(
        '/(\b(select|insert|update|delete|drop|union|--|\#|;)\b)/i',
        $value
    );
}

try {
    // Ensure we are targeting the correct database defined in key.php
    $pdo->exec("USE " . DB_NAME);

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

    // Fetch user using the $pdo instance from key.php
    $stmt = $pdo->prepare("
        SELECT id, password, status, role, phone
        FROM users
        WHERE username = :username
        LIMIT 1
    ");
    $stmt->execute(['username' => $username]);

    $user = $stmt->fetch();

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
        'phone'   => bin2hex($user['phone'] ?? '') // keep frontend hex-consistent
    ]);

} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Authentication failed',
        'debug' => $e->getMessage() // You can remove this in production
    ]);
}