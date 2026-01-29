<?php
// scripts/drop-and-clean.php   ← suggested name

define('APP_INIT', true);

header('Content-Type: application/json');

// Load your DB credentials
require_once __DIR__ . '/key.php';

// Helper to delete files in a folder (except some protected names)
function deleteFilesInDirectory($dirPath, $except = []) {
    if (!is_dir($dirPath)) {
        return ['success' => false, 'count' => 0, 'error' => 'Directory not found: ' . $dirPath];
    }

    $files = scandir($dirPath);
    $deleted = 0;
    $errors  = [];

    foreach ($files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }

        $fullPath = $dirPath . DIRECTORY_SEPARATOR . $file;

        if (in_array($file, $except, true)) {
            continue;
        }

        if (is_file($fullPath)) {
            if (@unlink($fullPath)) {
                $deleted++;
            } else {
                $errors[] = "Failed to delete: $file";
            }
        }
    }

    return [
        'success' => empty($errors),
        'count'   => $deleted,
        'errors'  => $errors
    ];
}

try {
    // ── 1. Connect to MySQL (no database selected)
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // ── 2. Check if database exists
    $stmt = $pdo->prepare("
        SELECT SCHEMA_NAME 
        FROM INFORMATION_SCHEMA.SCHEMATA 
        WHERE SCHEMA_NAME = ?
    ");
    $stmt->execute([DB_NAME]);

    if (!$stmt->fetch()) {
        echo json_encode([
            'status'  => 'not_found',
            'message' => "Database '$DB_NAME' does not exist"
        ]);
        exit;
    }

    // ── 3. Drop database
    $pdo->exec("DROP DATABASE IF EXISTS `" . DB_NAME . "`");

    // ── 4. Clean profiles folder — keep default.jpg / default.png etc.
    $profilesDir = __DIR__ . '/../assets/images/profiles';
    $profilesResult = deleteFilesInDirectory($profilesDir, [
        'default.jpg',
        'default.jpeg',
        'default.png',
        'default.webp',
        'default.gif'
    ]);

    // ── 5. Clean products folder — delete everything
    $productsDir = __DIR__ . '/../assets/images/products';
    $productsResult = deleteFilesInDirectory($productsDir);

    // ── Response
    echo json_encode([
        'status'              => 'success',
        'message'             => 'Reset completed',
        'database'            => 'dropped',
        'profiles' => [
            'directory'       => $profilesDir,
            'files_deleted'   => $profilesResult['count'],
            'success'         => $profilesResult['success'],
            'errors'          => $profilesResult['errors'] ?: null,
        ],
        'products' => [
            'directory'       => $productsDir,
            'files_deleted'   => $productsResult['count'],
            'success'         => $productsResult['success'],
            'errors'          => $productsResult['errors'] ?: null,
        ]
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage(),
        'file'    => $e->getFile(),
        'line'    => $e->getLine(),
        'trace'   => $e->getTraceAsString()   // remove in production
    ]);
}