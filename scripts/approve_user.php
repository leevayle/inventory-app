<?php
define('APP_INIT', true);
header('Content-Type: application/json');
session_start();

require_once __DIR__ . '/key.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

try {
    if (!isset($pdo)) {
        throw new Exception('Database connection missing');
    }

    $pdo->exec("USE " . DB_NAME);

    $userId   = (int)($_POST['user_id'] ?? 0);
    $action   = $_POST['action'] ?? '';
    $username = trim($_POST['username'] ?? '');
    $phone    = trim($_POST['phone'] ?? '');
    $role     = $_POST['role'] ?? null;
    $status   = $_POST['status'] ?? null;

    if ($userId <= 0 || !$username || !$phone) {
        throw new Exception('Invalid parameters');
    }

    if (!in_array($action, ['approve', 'reject'], true)) {
        throw new Exception('Invalid action');
    }

    // 🔴 REJECT
    if ($action === 'reject') {
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id AND role = 'pending'");
        $stmt->execute(['id' => $userId]);

        if ($stmt->rowCount() === 0) {
            throw new Exception('User not found or already processed');
        }

        echo json_encode([
            'success' => true,
            'message' => 'User rejected successfully'
        ]);
        exit;
    }

    // 🟢 APPROVE
    if (!$role || !$status) {
        throw new Exception('Role and status required');
    }

    $allowedRoles  = ['admin', 'cashier', 'manager', 'superadmin'];
    $allowedStatus = ['active', 'inactive'];

    if (!in_array($role, $allowedRoles, true)) {
        throw new Exception('Invalid role');
    }

    if (!in_array($status, $allowedStatus, true)) {
        throw new Exception('Invalid status');
    }

    $stmt = $pdo->prepare("
        UPDATE users
        SET role = :role,
            status = :status
        WHERE id = :id AND role = 'pending'
    ");

    $stmt->execute([
        'role' => $role,
        'status' => $status,
        'id' => $userId
    ]);

    if ($stmt->rowCount() === 0) {
        throw new Exception('User not found or already approved');
    }

    echo json_encode([
        'success' => true,
        'message' => 'User approved successfully'
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
