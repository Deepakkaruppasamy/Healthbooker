<?php
// Database connection configuration
$host = 'localhost';
$db_name = 'medconsult_db';
$username = 'root';      // Your MySQL username
$password = '';          // Your MySQL password
$port = 3306;           // Default MySQL port

try {
    // Create database connection
    $conn = new mysqli($host, $username, $password, $db_name, $port);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Set character set
    $conn->set_charset("utf8mb4");

    // Enable error reporting for debugging
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

} catch (Exception $e) {
    // Log the error and show a generic message
    error_log($e->getMessage());
    die("Database connection error. Please try again later.");
}

// Function to generate JSON response
function response($status, $message, $data = null) {
    header('Content-Type: application/json');
    $response = [
        'status' => $status,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    echo json_encode($response);
    exit();
}

// Function to sanitize input data
function sanitize_input($data) {
    global $conn;
    return $conn->real_escape_string(trim($data));
}

// Function to validate email
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to hash passwords
function hash_password($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

// Function to verify password
function verify_password($password, $hash) {
    return password_verify($password, $hash);
}
?> 