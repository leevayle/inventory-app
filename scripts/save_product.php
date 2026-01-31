<?php
// ───────────── PHP: save_product.php ─────────────
define('APP_INIT', true);
header('Content-Type: application/json');

require_once __DIR__ . '/key.php';

$response = [
    'status' => 'error',
    'message' => 'Unknown error'
];

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // 🔹 Validate required fields
    $required = ['product_name', 'product_code', 'price', 'quantity', 'product_image'];
    foreach ($required as $field) {
        if ($field === 'product_image') {
            if (!isset($_FILES[$field]) || $_FILES[$field]['error'] !== 0) {
                throw new Exception("Missing field: {$field}");
            }
        } else if (empty($_POST[$field])) {
            throw new Exception("Missing field: {$field}");
        }
    }

    // 🔹 Collect POST data
    $product_name = trim($_POST['product_name']);
    $product_code = trim($_POST['product_code']);
    $price        = floatval($_POST['price']);
    $quantity     = intval($_POST['quantity']);
    $description  = $_POST['description'] ?? '';
    $category_id  = $_POST['category_id'] ?? null;

    // 🔹 Handle uploaded image
    $image      = $_FILES['product_image'];
    $ext        = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));
    $allowedExt = ['jpg','jpeg','png','webp'];

    if (!in_array($ext, $allowedExt)) {
        throw new Exception('Invalid image type');
    }

    $imageDir = __DIR__ . '/../assets/images/products/';
    if (!is_dir($imageDir)) mkdir($imageDir, 0755, true);

    $imageName = $product_code . '.' . $ext;
    $imagePath = $imageDir . $imageName;
    $dbPath    = 'assets/images/products/' . $imageName;

    if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
        throw new Exception('Failed to save image');
    }

    // 🔹 Insert into DB
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("
        INSERT INTO products (
            product_name,
            product_code,
            description,
            price,
            quantity,
            category_id,
            image_url
        ) VALUES (
            :product_name,
            :product_code,
            :description,
            :price,
            :quantity,
            :category_id,
            :image_url
        )
    ");

    $stmt->execute([
        ':product_name' => $product_name,
        ':product_code' => $product_code,
        ':description'  => $description,
        ':price'        => $price,
        ':quantity'     => $quantity,
        ':category_id'  => $category_id,
        ':image_url'    => $dbPath
    ]);

    $response['status']  = 'success';
    $response['message'] = 'Product saved successfully';

} catch (Exception $e) {
    $response['status']  = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;
?>
