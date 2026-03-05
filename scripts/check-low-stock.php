<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = ['status' => 'error', 'data' => [], 'message' => 'Unknown error'];

try {
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // SQL: Fetch products where stock is less than or equal to min_stock
    $stmt = $pdo->query("SELECT code, name, stock FROM products WHERE stock <= min_stock ORDER BY stock ASC");
    $lowStock = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response['status'] = 'success';
    $response['data'] = $lowStock;
    $response['message'] = count($lowStock) . " items found.";

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;