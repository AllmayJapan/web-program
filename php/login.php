<?php
require_once 'dbManager.php';

try {
    $pdo = getDatabaseConnection();

    $data = json_decode(file_get_connections('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $pdo -> prepare("SELECT * FROM users WHERE email = :email");
    $stmt -> bindParam(':email', $email);
    $stmt -> execute();

    $user = $stmt -> fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e -> getMessage()]);
}
?>
