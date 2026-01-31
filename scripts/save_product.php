<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = ['status'=>'error','message'=>'Unknown error'];

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method');

    // Required fields (branch_id defaults to 1)
    $branch_id     = isset($_POST['branch_id']) && $_POST['branch_id'] !== '' ? intval($_POST['branch_id']) : 1;
    $name          = trim($_POST['product_name'] ?? '');
    $code          = trim($_POST['product_code'] ?? '');
    $cost_price    = floatval($_POST['cost_price'] ?? 0);
    $selling_price = floatval($_POST['selling_price'] ?? 0);
    $unit_price    = floatval($_POST['price'] ?? 0);
    $stock         = intval($_POST['quantity'] ?? 0);
    $picture       = $_FILES['product_image'] ?? null;

    if (!$name || !$code || !$cost_price || !$selling_price || !$unit_price || !$stock || !$picture) {
        throw new Exception('Missing required fields');
    }

    // Optional fields default to null
    $category_id = $_POST['category_id'] ?? null;
    $supplier_id = $_POST['supplier_id'] ?? null;
    $sku         = $_POST['sku'] ?? null;
    $batch       = $_POST['batch'] ?? null;
    $description = $_POST['description'] ?? null;
    $min_stock   = isset($_POST['min_stock']) ? intval($_POST['min_stock']) : null;
    $expiry_date = $_POST['expiry_date'] ?? null;
    $barcode     = $_POST['barcode'] ?? null;
    $qrcode      = $_POST['qrcode'] ?? null;
    $is_active   = isset($_POST['is_active']) ? intval($_POST['is_active']) : 1;

    // Handle uploaded image
    $ext = strtolower(pathinfo($picture['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg','jpeg','png','webp'];
    if (!in_array($ext, $allowed)) throw new Exception('Invalid image type');

    $dir = __DIR__ . '/../assets/images/products/';
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $imageName = $code . '.' . $ext;
    $imagePath = $dir . $imageName;
    $dbPath = 'assets/images/products/' . $imageName;

    if (!move_uploaded_file($picture['tmp_name'], $imagePath)) throw new Exception('Failed to save image');

    // Insert into DB
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("
        INSERT INTO products (
            branch_id, category_id, code, name, sku, batch, supplier_id, description,
            stock, min_stock, cost_price, selling_price, unit_price,
            expiry_date, barcode, qrcode, picture_url, is_active
        ) VALUES (
            :branch_id, :category_id, :code, :name, :sku, :batch, :supplier_id, :description,
            :stock, :min_stock, :cost_price, :selling_price, :unit_price,
            :expiry_date, :barcode, :qrcode, :picture_url, :is_active
        )
    ");

    $stmt->execute([
        ':branch_id'=>$branch_id,
        ':category_id'=>$category_id,
        ':code'=>$code,
        ':name'=>$name,
        ':sku'=>$sku,
        ':batch'=>$batch,
        ':supplier_id'=>$supplier_id,
        ':description'=>$description,
        ':stock'=>$stock,
        ':min_stock'=>$min_stock,
        ':cost_price'=>$cost_price,
        ':selling_price'=>$selling_price,
        ':unit_price'=>$unit_price,
        ':expiry_date'=>$expiry_date,
        ':barcode'=>$barcode,
        ':qrcode'=>$qrcode,
        ':picture_url'=>$dbPath,
        ':is_active'=>$is_active
    ]);

    $response['status'] = 'success';
    $response['message'] = 'Product saved successfully';

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;
