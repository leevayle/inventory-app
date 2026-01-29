<?php
define('APP_INIT', true);

header('Content-Type: application/json');

/*
|--------------------------------------------------------------------------
| HARD-CODED INSTALLER DATABASE CREDENTIALS
|--------------------------------------------------------------------------
| Installer must NOT rely on runtime config
*/
$DB_HOST    = 'localhost';
$DB_NAME    = 'swift_pos_invent';
$DB_USER    = 'root';
$DB_PASS    = '';
$DB_CHARSET = 'utf8mb4';

$response = [
    'status'  => 'progress',
    'step'    => 0,
    'message' => ''
];

try {

    $input = json_decode(file_get_contents('php://input'), true);
    $step  = (int)($input['step'] ?? 1);

    /*
    |--------------------------------------------------------------------------
    | STEP 1: CONNECT TO MYSQL (NO DB) + CREATE DATABASE
    |--------------------------------------------------------------------------
    */
    if ($step === 1) {

        $pdo = new PDO(
            "mysql:host=$DB_HOST;charset=$DB_CHARSET",
            $DB_USER,
            $DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]
        );

        $stmt = $pdo->prepare("
            SELECT SCHEMA_NAME
            FROM INFORMATION_SCHEMA.SCHEMATA
            WHERE SCHEMA_NAME = :dbname
        ");
        $stmt->execute(['dbname' => $DB_NAME]);

        if (!$stmt->fetch()) {
            $pdo->exec("
                CREATE DATABASE `$DB_NAME`
                CHARACTER SET utf8mb4
                COLLATE utf8mb4_general_ci
            ");
        }

        $response['step']    = 1;
        $response['message'] = 'Database created / already exists';
        echo json_encode($response);
        exit;
    }

    /*
    |--------------------------------------------------------------------------
    | STEP 2: CONNECT TO DB + CREATE TABLES
    |--------------------------------------------------------------------------
    */
    if ($step === 2) {

        $pdo = new PDO(
            "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET",
            $DB_USER,
            $DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]
        );

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
    |--------------------------------------------------------------------------
    | STEP 3: SEED ADMIN USER (RESPECT NOT NULL FIELDS)
    |--------------------------------------------------------------------------
    */
    if ($step === 3) {

        $pdo = new PDO(
            "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET",
            $DB_USER,
            $DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]
        );

        $check = $pdo->prepare("SELECT id FROM users WHERE username = 'admin'");
        $check->execute();

        if (!$check->fetch()) {

            $hash = password_hash('admin$', PASSWORD_DEFAULT);
            $pin  = password_hash('1234', PASSWORD_DEFAULT);

            $insert = $pdo->prepare("
                INSERT INTO users (
                    fname,
                    sname,
                    username,
                    email,
                    phone,
                    password,
                    pin,
                    role,
                    status
                ) VALUES (
                    'System',
                    'Administrator',
                    'admin',
                    'admin@localhost',
                    '0700000000',
                    :password,
                    :pin,
                    'superadmin',
                    'active'
                )
            ");

            $insert->execute([
                'password' => $hash,
                'pin'      => $pin
            ]);
        }

        $response['step']   = 3;
        $response['status'] = 'success';
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
    exit;
}
