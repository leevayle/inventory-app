<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = ['status' => 'error', 'message' => 'Unknown error'];

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method');

    $code = trim($_POST['code'] ?? '');
    $qty  = isset($_POST['qty']) ? intval($_POST['qty']) : null;

    if (empty($code)) throw new Exception('Missing product code');
    if ($qty === null) throw new Exception('Missing quantity value');

    // Database Connection
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Update the stock
    $stmt = $pdo->prepare("UPDATE products SET stock = :qty WHERE code = :code");
    $stmt->execute([':qty' => $qty, ':code' => $code]);

    // Check if anything actually happened
    if ($stmt->rowCount() >= 0) {
        $response['status'] = 'success';
        $response['message'] = 'Quantity synchronized successfully';
    } else {
        throw new Exception('Product not found in database');
    }

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;