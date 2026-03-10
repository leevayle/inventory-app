<?php
header('Content-Type: application/json');
define('APP_INIT', true);
require_once 'key.php'; // Ensure path is correct relative to this file

try {
    // Exact column names from your schema: name, phone, email, address, receipt_footer
    $stmt = $pdo->query("SELECT name, phone, email, address, receipt_footer FROM company LIMIT 1");
    $company = $stmt->fetch();

    if ($company) {
        echo json_encode(['status' => 'success', 'data' => $company]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No company details found.']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}