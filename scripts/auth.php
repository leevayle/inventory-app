<?php
// Required by key.php
define('APP_INIT', true);

// JSON response
header('Content-Type: application/json');

// Start session (CRITICAL)
session_start();

// DB connection
require_once __DIR__ . '/key.php';

/**
 * Convert hex string to normal string
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
 * Basic SQL injection pattern detection
 */
function looksLikeInjection(string $value): bool {
    return preg_match(
        '/(\b(select|insert|update|delete|drop|union|--|\#|;)\b)/i',
        $value
    );
}

try {
    // Ensure correct database
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
    $username = trim(hexToString($input['username']));
    $password = hexToString($input['password']);

    // Username rules
    if (strlen($username) > 15) {
        echo json_encode(['error' => 'Username too long']);
        exit;
    }

    if (looksLikeInjection($username) || looksLikeInjection($password)) {
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    // Fetch user + last_login_at
    $stmt = $pdo->prepare("
        SELECT id, username, password, status, role, phone, last_login_at
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

    // Verify password
    if (!password_verify($password, $user['password'])) {
        echo json_encode(['error' => 'Wrong password']);
        exit;
    }

    // Check account status
    if ($user['status'] !== 'active') {
        echo json_encode(['error' => 'User inactive']);
        exit;
    }

    // ────────────────────────────────────────────────
    //               UPDATE last login time
    // ────────────────────────────────────────────────
    $updateStmt = $pdo->prepare("
        UPDATE users 
        SET last_login_at = NOW()
        WHERE id = :id
    ");
    $updateStmt->execute(['id' => $user['id']]);

    // ────────────────────────────────────────────────
    //               SESSION
    // ────────────────────────────────────────────────
    $_SESSION['user_id']  = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role']     = $user['role'];
    $_SESSION['phone']    = $user['phone'];

    // Optional but recommended (prevents session fixation)
    session_regenerate_id(true);

    // Respond with original success + the PREVIOUS last_login_at value
    // (before we updated it)
    echo json_encode([
        'success'       => true,
        'last_login_at' => $user['last_login_at']   // null or "2024-11-15 14:30:22"
    ]);

} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Authentication failed'
        // 'debug' => $e->getMessage()  // uncomment only during development
    ]);
}