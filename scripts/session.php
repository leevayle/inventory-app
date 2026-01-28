<?php
// JSON response
header('Content-Type: application/json');

// Start session
session_start();

/**
 * Check authentication
 */
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'authenticated' => false
    ]);
    exit;
}

/**
 * Authenticated user payload
 * (only non-sensitive data)
 */
echo json_encode([
    'authenticated' => true,
    'user' => [
        'id'       => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'role'     => $_SESSION['role']
    ]
]);
