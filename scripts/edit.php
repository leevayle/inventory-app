<?php
define('APP_INIT', true);
header('Content-Type: application/json');
require_once __DIR__ . '/key.php';

$response = ['status'=>'error','message'=>'Unknown error'];

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('Invalid request method');

    // 'code' is the unique identifier for the WHERE clause
    $code = trim($_POST['code'] ?? '');
    if (!$code) throw new Exception('Product code is missing');

    // Database Connection using your constants
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]
    );

    $updateFields = [];
    $params = [':code' => $code];

    // Mapping between Form Name => Database Column Name
    $allowedMapping = [
        'name'        => 'name',
        'batch'       => 'batch',
        'supplier'    => 'supplier_id',
        'unit_price'  => 'unit_price',
        'qty'         => 'stock',
        'expiry_date' => 'expiry_date'
    ];

    // Build query based on populated fields sent by JS
    foreach ($allowedMapping as $formKey => $dbCol) {
        if (isset($_POST[$formKey])) {
            $updateFields[] = "$dbCol = :$formKey";
            $params[":$formKey"] = $_POST[$formKey];
        }
    }

    // Handle Image Upload (only if sent in cleanData)
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg','jpeg','png','webp'];
        
        if (in_array($ext, $allowed)) {
            $dir = __DIR__ . '/../assets/images/products/';
            if (!is_dir($dir)) mkdir($dir, 0755, true);
            
            // Unique filename using code and timestamp
            $imageName = $code . '_' . time() . '.' . $ext;
            $imagePath = $dir . $imageName;
            $dbPath = 'assets/images/products/' . $imageName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
                $updateFields[] = "picture_url = :pic";
                $params[':pic'] = $dbPath;
            }
        }
    }

    if (empty($updateFields)) {
        throw new Exception('No changes were provided');
    }

    // Execute the dynamic update
    $sql = "UPDATE products SET " . implode(', ', $updateFields) . " WHERE code = :code";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $response['status'] = 'success';
    $response['message'] = 'Product information updated successfully';

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit;