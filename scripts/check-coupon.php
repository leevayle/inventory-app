<?php
define('APP_INIT', true); // Mandatory to pass the security check in key.php
header('Content-Type: application/json');
require_once 'key.php'; // Using your shared file

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['code'])) {
    $code = trim($_POST['code']);
    $today = date('Y-m-d');

    try {
        // Using $pdo from key.php with a Prepared Statement
        $stmt = $pdo->prepare("SELECT discount, expires_at FROM coupons WHERE code = ? LIMIT 1");
        $stmt->execute([$code]);
        $row = $stmt->fetch();

        if ($row) {
            if ($row['expires_at'] >= $today) {
                echo json_encode(['status' => 'success', 'discount' => $row['discount']]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Coupon expired on ' . $row['expires_at']]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid coupon code']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error']);
    }
}