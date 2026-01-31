<?php
define('APP_INIT', true);
header('Content-Type: application/json');
session_start();

require_once __DIR__ . '/key.php';

try {
    // Force PDO exceptions
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Authentication check
    if (!isset($_SESSION['user_id']) || !is_numeric($_SESSION['user_id'])) {
        throw new Exception('Not authenticated');
    }

    $userId = (int)$_SESSION['user_id'];

    // Fetch phone number
    $stmt = $pdo->prepare("SELECT phone FROM users WHERE id = :id LIMIT 1");
    $stmt->execute(['id' => $userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || empty($user['phone'])) {
        throw new Exception('Phone number not found for this user');
    }

    $phone = trim($user['phone']);

    // Convert phone to hex
    $phoneHex = '';
    for ($i = 0; $i < strlen($phone); $i++) {
        $phoneHex .= dechex(ord($phone[$i]));
    }

    // Only POST requests allowed
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Form data
    $fname  = trim($_POST['fname'] ?? '');
    $sname  = trim($_POST['surname'] ?? '');
    $gender = $_POST['gender'] ?? 'unset';

    if (empty($fname) || empty($sname)) {
        throw new Exception('First name and last name are required');
    }

    // Normalize gender
    $allowedGenders = ['male', 'female', 'unset'];
    if (!in_array($gender, $allowedGenders, true)) {
        $gender = 'unset';
    }

    // Handle profile picture upload (optional)
    $profileUrl = null;
    $uploadDir  = __DIR__ . '/../assets/images/profiles/';
    $maxSize    = 5 * 1024 * 1024; // 5 MB

    if (!empty($_FILES['profile_pic']['name'])) {
        $file = $_FILES['profile_pic'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            $phpErrors = [
                UPLOAD_ERR_INI_SIZE   => 'File exceeds upload_max_filesize',
                UPLOAD_ERR_FORM_SIZE  => 'File exceeds MAX_FILE_SIZE',
                UPLOAD_ERR_PARTIAL    => 'File partially uploaded',
                UPLOAD_ERR_NO_FILE    => 'No file uploaded',
                UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
                UPLOAD_ERR_CANT_WRITE => 'Failed to write to disk',
                UPLOAD_ERR_EXTENSION  => 'PHP extension stopped upload'
            ];
            $errMsg = $phpErrors[$file['error']] ?? 'Unknown upload error';
            throw new Exception($errMsg);
        }

        if ($file['size'] > $maxSize) {
            throw new Exception('File too large (max 5MB)');
        }

        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($ext, $allowedExt, true)) {
            throw new Exception('Only JPG, PNG, WebP allowed');
        }

        if (!is_uploaded_file($file['tmp_name'])) {
            throw new Exception('Invalid uploaded file');
        }

        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
            throw new Exception('Failed to create profiles directory');
        }

        // Move to temporary file first
        $tempName = tempnam($uploadDir, 'tmp_');
        if (!move_uploaded_file($file['tmp_name'], $tempName)) {
            throw new Exception('Failed to move uploaded file');
        }

        // Validate image
        if (!getimagesize($tempName)) {
            unlink($tempName);
            throw new Exception('Uploaded file is not a valid image');
        }

        // Final filename
        $newFileName = $phoneHex . '.' . $ext;
        $destination = $uploadDir . $newFileName;
        rename($tempName, $destination);

        $profileUrl = 'assets/images/profiles/' . $newFileName;
    }

    // Update database
    $sql = "UPDATE users SET fname = :fname, sname = :sname, gender = :gender";
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

    echo json_encode([
        'success'     => true,
        'message'     => 'Profile updated successfully',
        'profile_url' => $profileUrl
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => $e->getMessage()
    ]);
}
