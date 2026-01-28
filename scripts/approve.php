<?php
define('APP_INIT', true);
header('Content-Type: application/json');
session_start();

require_once __DIR__ . '/key.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Not authenticated']);
    exit;
}

try {
    if (!isset($pdo)) {
        throw new Exception('Database connection missing');
    }

    $pdo->exec("USE " . DB_NAME);

    $userId = (int)$_SESSION['user_id'];

    // 1️⃣ Fetch current logged-in user
    $stmtUser = $pdo->prepare("
        SELECT id, fname, sname, profile_url
        FROM users
        WHERE id = :id
        LIMIT 1
    ");
    $stmtUser->execute(['id' => $userId]);
    $user = $stmtUser->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (empty($user['profile_url'])) {
            $user['profile_url'] = '/inventory-app/assets/images/profiles/default.jpg';
        } else if (substr($user['profile_url'], 0, 1) !== '/') {
            $user['profile_url'] = '/inventory-app/' . $user['profile_url'];
        }
        // cache-buster
        $user['profile_url'] .= '?v=' . time();
    }

    // 2️⃣ Fetch total pending users
    $stmtPending = $pdo->query("
        SELECT COUNT(*) AS pendingCount
        FROM users
        WHERE role = 'pending'
    ");
    $pendingCount = (int) $stmtPending->fetchColumn();

    echo json_encode([
        'success' => true,
        'user' => $user,
        'pendingCount' => $pendingCount
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Server error',
        'debug'   => $e->getMessage()
    ]);
}
