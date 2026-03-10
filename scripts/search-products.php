<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = ['status' => 'error', 'message' => 'Unknown error', 'products' => [], 'total' => 0];

try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4", DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    $limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $offset = ($page - 1) * $limit;

    $whereSql = '';
    $params = [];
    if ($search !== '') {
        $whereSql = " WHERE code LIKE :q OR name LIKE :q OR sku LIKE :q OR description LIKE :q ";
        $params[':q'] = '%' . $search . '%';
    }

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM products $whereSql");
    $countStmt->execute($params);
    $totalRows = (int) $countStmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT code, name, sku, description, stock, unit_price, picture_url FROM products $whereSql ORDER BY id ASC LIMIT $limit OFFSET $offset");
    $stmt->execute($params);
    
    $response['status'] = 'success';
    $response['products'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['total'] = $totalRows;

} catch (Throwable $e) { $response['message'] = $e->getMessage(); }

echo json_encode($response);
exit;