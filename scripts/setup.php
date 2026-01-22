<?php
define('APP_INIT', true);

header('Content-Type: application/json');

require_once __DIR__ . '/key.php';

$response = [
    'status'  => 'progress',
    'step'    => 0,
    'message' => ''
];

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $step  = (int) ($input['step'] ?? 1);

    /*
     * STEP 1: CREATE DATABASE
     */
    if ($step === 1) {

        $stmt = $pdo->prepare("
            SELECT SCHEMA_NAME
            FROM INFORMATION_SCHEMA.SCHEMATA
            WHERE SCHEMA_NAME = :dbname
        ");
        $stmt->execute(['dbname' => DB_NAME]);

        if (!$stmt->fetch()) {
            $pdo->exec("
                CREATE DATABASE `" . DB_NAME . "`
                CHARACTER SET utf8mb4
                COLLATE utf8mb4_general_ci
            ");
        }

        $pdo->exec("USE `" . DB_NAME . "`");

        $response['step']    = 1;
        $response['message'] = 'Database ready';
        echo json_encode($response);
        exit;
    }

    /*
     * STEP 2: CREATE TABLES (FROM SCHEMA FILE)
     */
    if ($step === 2) {

        $pdo->exec("USE `" . DB_NAME . "`");

        $schemaFile = __DIR__ . '/schema/tables.php';

        if (!file_exists($schemaFile)) {
            throw new Exception('Schema file missing');
        }

        $tables = require $schemaFile;

        if (!is_array($tables) || empty($tables)) {
            throw new Exception('Invalid schema definition');
        }

        foreach ($tables as $tableName => $sql) {
            $pdo->exec($sql);
        }

        $response['step']    = 2;
        $response['message'] = 'Tables created';
        echo json_encode($response);
        exit;
    }

    /*
     * STEP 3: SEED ADMIN USER
     */
    if ($step === 3) {

        $pdo->exec("USE `" . DB_NAME . "`");

        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = 'admin'");
        $stmt->execute();

        if (!$stmt->fetch()) {
            $hash = password_hash('admin$', PASSWORD_DEFAULT);

            $insert = $pdo->prepare("
                INSERT INTO users (username, password, role, status)
                VALUES ('admin', :pass, 'superadmin', 'active')
            ");
            $insert->execute(['pass' => $hash]);
        }

        $response['step']    = 3;
        $response['status']  = 'success';
        $response['message'] = 'Installation complete';
        echo json_encode($response);
        exit;
    }

    throw new Exception('Invalid install step');

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'step'    => $response['step'],
        'message' => $e->getMessage()
    ]);
}
