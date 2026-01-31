<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = ['status'=>'error','message'=>'Unknown error','products'=>[]];

try {
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("
        SELECT code, name, stock, unit_price, picture_url
        FROM products
        ORDER BY id ASC
        LIMIT 20
    ");
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response['status'] = 'success';
    $response['message'] = 'Products fetched successfully';
    $response['products'] = $products;

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;
