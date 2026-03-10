<?php
// 1. Set header first
header('Content-Type: application/json');

// 2. Initialize the app so key.php allows the connection
define('APP_INIT', true);

// 3. Include your database configuration
// Adjust path if key.php is in a different folder
require_once 'key.php'; 

try {
    // 4. Get the JSON payload from sell.js
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || !isset($data['cart'])) {
        throw new Exception("Invalid sale data received.");
    }

    // 5. Start Transaction
    $pdo->beginTransaction();

    foreach ($data['cart'] as $item) {
        // Update stock in your swift_pos_invent database
        $stmt = $pdo->prepare("UPDATE products SET stock = stock - ? WHERE code = ?");
        $stmt->execute([$item['quantity'], $item['code']]);

        // Optional: Insert into a sales or transaction table here
    }

    $pdo->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Sale confirmed and stock updated!'
    ]);

} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}