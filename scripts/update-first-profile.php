<?php
// update-first-profile.php

// ──────────────────────── DEBUG MODE (remove in production) ────────────────────────
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
// ───────────────────────────────────────────────────────────────────────────────────

define('APP_INIT', true);
header('Content-Type: application/json');
session_start();

require_once __DIR__ . '/key.php';

try {
    // Force PDO to throw exceptions
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 1. Authentication check
    if (!isset($_SESSION['user_id']) || !is_numeric($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error'   => 'Not authenticated',
            'details' => 'Missing or invalid user_id in session'
        ]);
        exit;
    }

    $userId = (int)$_SESSION['user_id'];

    // 2. Get phone number
    $stmt = $pdo->prepare("
        SELECT phone 
        FROM users 
        WHERE id = :id 
        LIMIT 1
    ");
    $stmt->execute(['id' => $userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || empty($user['phone'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error'   => 'Phone number not found',
            'details' => 'No phone record for user ID ' . $userId
        ]);
        exit;
    }

    $phone = trim($user['phone']);

    // Convert phone to hex (matching your login style)
    $phoneHex = '';
    for ($i = 0; $i < strlen($phone); $i++) {
        $phoneHex .= dechex(ord($phone[$i]));
    }

    // 3. Handle only POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
    }

    // 4. Get form data
    $fname  = trim($_POST['fname']  ?? '');
    $sname  = trim($_POST['surname']  ?? '');  // your form uses lname
    $gender = $_POST['gender']       ?? 'unset';

    if (empty($fname) || empty($sname)) {
        echo json_encode([
            'success' => false,
            'error'   => 'First name and last name are required'
        ]);
        exit;
    }

    // Normalize gender to match ENUM
    $allowed = ['male', 'female', 'unset'];
    if (!in_array($gender, $allowed, true)) {
        $gender = 'unset';
    }

    // 5. Handle profile picture upload (optional)
    $profileUrl = null;
    $uploadDir  = __DIR__ . '/../assets/images/profiles/';
    $maxSize    = 5 * 1024 * 1024; // 5 MB

    if (!empty($_FILES['profile_pic']['name']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        $file     = $_FILES['profile_pic'];
        $fileSize = $file['size'];
        $fileTmp  = $file['tmp_name'];
        $fileName = $file['name'];

        if ($fileSize > $maxSize) {
            echo json_encode(['success' => false, 'error' => 'File too large (max 5MB)']);
            exit;
        }

        $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($ext, $allowedExt, true)) {
            echo json_encode(['success' => false, 'error' => 'Only JPG, PNG, WebP allowed']);
            exit;
        }

        // Create filename: hex(phone).extension
        $newFileName = $phoneHex . '.' . $ext;
        $destination = $uploadDir . $newFileName;

        // Ensure directory exists
        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
            echo json_encode([
                'success' => false,
                'error'   => 'Failed to create profiles directory'
            ]);
            exit;
        }

        if (!move_uploaded_file($fileTmp, $destination)) {
            echo json_encode([
                'success' => false,
                'error'   => 'Failed to save uploaded file',
                'php_error' => error_get_last() ?? 'No additional info'
            ]);
            exit;
        }

        $profileUrl = 'assets/images/profiles/' . $newFileName;
    }

    // 6. Update database
    $sql = "
        UPDATE users
        SET 
            fname  = :fname,
            sname  = :sname,
            gender = :gender
    ";
    $params = [
        ':fname'  => $fname,
        ':sname'  => $sname,
        ':gender' => $gender,
        ':id'     => $userId
    ];

    if ($profileUrl !== null) {
        $sql .= ", profile_url = :profile_url";
        $params[':profile_url'] = $profileUrl;
    }

    $sql .= " WHERE id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Success
    echo json_encode([
        'success'     => true,
        'message'     => 'Profile updated successfully',
        'profile_url' => $profileUrl
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Database error',
        'message' => $e->getMessage(),
        'code'    => $e->getCode(),
        'file'    => $e->getFile(),
        'line'    => $e->getLine()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Server error',
        'message' => $e->getMessage()
    ]);
}