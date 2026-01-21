<?php
header('Content-Type: application/json');

$DB_HOST = 'localhost';
$DB_NAME = 'swift_pos_invent';
$DB_USER = 'root';
$DB_PASS = '';

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("
        SELECT SCHEMA_NAME 
        FROM INFORMATION_SCHEMA.SCHEMATA 
        WHERE SCHEMA_NAME = :dbname
    ");

    $stmt->execute(['dbname' => $DB_NAME]);

    if ($stmt->fetch()) {
        echo json_encode([
            'status'  => 'installed',
            'message' => 'Database exists'
        ]);
    } else {
        // NOTE: Always return 200, not 404
        echo json_encode([
            'status'  => 'not_installed',
            'message' => 'Database not found'
        ]);
    }

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Database check failed',
        'detail'  => $e->getMessage()
    ]);
}
