<?php
header('Content-Type: application/json');

// Load database config and $pdo from key.php
define('APP_INIT', true);
require_once __DIR__ . '/key.php';

function hexToString(string $hex): string {
    if (!ctype_xdigit($hex)) {
        throw new Exception('Invalid hex data');
    }

    $str = '';
    for ($i = 0; $i < strlen($hex); $i += 2) {
        $str .= chr(hexdec(substr($hex, $i, 2)));
    }
    return $str;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || empty($input['001'])) {
        throw new Exception('Payload missing');
    }

    // Decode phone
    $phone = hexToString($input['001']);

    if (!preg_match('/^\+?\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone number');
    }

    // Use $pdo from key.php
    $stmt = $pdo->prepare("
        SELECT status, role
        FROM users
        WHERE phone = :phone
        LIMIT 1
    ");
    $stmt->execute(['phone' => $phone]);

    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    echo json_encode([
        'status' => $user['status'],
        'role'   => $user['role']
    ]);

} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
