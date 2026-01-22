<?php
define('APP_INIT', true);

header('Content-Type: application/json');

require_once __DIR__ . '/key.php';

try {
    // 1️⃣ Connect to MySQL server (no database selected)
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

    // 2️⃣ Check if database exists
    $stmt = $pdo->prepare("
        SELECT SCHEMA_NAME
        FROM INFORMATION_SCHEMA.SCHEMATA
        WHERE SCHEMA_NAME = :dbname
    ");
    $stmt->execute(['dbname' => DB_NAME]);

    if (!$stmt->fetch()) {
        echo json_encode([
            'status'  => 'not_found',
            'message' => 'Database does not exist'
        ]);
        exit;
    }

    // 3️⃣ Drop database
    $pdo->exec("DROP DATABASE `" . DB_NAME . "`");

    echo json_encode([
        'status'  => 'success',
        'message' => 'Database dropped successfully'
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage()
    ]);
}
