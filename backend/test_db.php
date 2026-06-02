<?php
require_once 'config.php';

try {
    // Test database connection
    $test_query = "SELECT COUNT(*) as user_count FROM users";
    $result = $conn->query($test_query);
    $row = $result->fetch_assoc();
    
    echo "Database connection successful!\n";
    echo "Number of users in database: " . $row['user_count'] . "\n";
    
    // Test password hashing
    $test_password = "test123";
    $hashed = hash_password($test_password);
    echo "Password hashing works: " . ($hashed !== $test_password ? "Yes" : "No") . "\n";
    
    // Test password verification
    echo "Password verification works: " . (verify_password($test_password, $hashed) ? "Yes" : "No") . "\n";
    
    // Test email validation
    $test_email = "test@example.com";
    echo "Email validation works: " . (is_valid_email($test_email) ? "Yes" : "No") . "\n";
    
    // Test input sanitization
    $test_input = "Test'Input\"";
    $sanitized = sanitize_input($test_input);
    echo "Input sanitization works: " . ($sanitized !== $test_input ? "Yes" : "No") . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?> 