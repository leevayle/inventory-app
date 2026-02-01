<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = [
    'status'   => 'error',
    'message'  => 'Unknown error',
    'products' => [],
    'total'    => 0
];

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $allowedLimits = [5, 20, 50, 100];
    $limit  = 20;
    $page   = 1;
    $search = '';

    if (isset($_GET['limit']) && in_array((int)$_GET['limit'], $allowedLimits, true)) {
        $limit = (int) $_GET['limit'];
    }

    if (isset($_GET['page']) && (int)$_GET['page'] > 0) {
        $page = (int) $_GET['page'];
    }

    if (isset($_GET['search'])) {
        $search = trim($_GET['search']);
    }

    $offset = ($page - 1) * $limit;

    $whereSql = '';
    $params   = [];

    if ($search !== '') {
        $whereSql = "
            WHERE
                code        LIKE :q
             OR name        LIKE :q
             OR sku         LIKE :q
             OR description LIKE :q
        ";
        $params[':q'] = '%' . $search . '%';
    }

    // total rows (after filtering)
    $countSql = "SELECT COUNT(*) FROM products {$whereSql}";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $totalRows = (int) $countStmt->fetchColumn();

    // fetch page
    $sql = "
        SELECT
            code,
            name,
            sku,
            description,
            stock,
            unit_price,
            picture_url
        FROM products
        {$whereSql}
        ORDER BY id ASC
        LIMIT {$limit} OFFSET {$offset}
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response['status']   = 'success';
    $response['products'] = $products;
    $response['total']    = $totalRows;

} catch (Throwable $e) {
    $response['status']  = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;
