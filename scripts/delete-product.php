<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = ['status' => 'error', 'message' => 'Unknown error'];

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method');

    $code = trim($_POST['code'] ?? '');
    if (!$code) throw new Exception('Product identifier is missing');

    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // 1. (Optional) Get picture URL to delete the file from assets
    $stmtImg = $pdo->prepare("SELECT picture_url FROM products WHERE code = :code");
    $stmtImg->execute([':code' => $code]);
    $product = $stmtImg->fetch(PDO::FETCH_ASSOC);

    if ($product && !empty($product['picture_url'])) {
        $filePath = __DIR__ . '/../' . $product['picture_url'];
        if (file_exists($filePath)) {
            unlink($filePath); // Remove image from server
        }
    }

    // 2. Delete the record from the database
    $stmt = $pdo->prepare("DELETE FROM products WHERE code = :code LIMIT 1");
    $stmt->execute([':code' => $code]);

    if ($stmt->rowCount() > 0) {
        $response['status'] = 'success';
        $response['message'] = 'Product has been permanently removed';
    } else {
        throw new Exception('Product not found or already deleted');
    }

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;