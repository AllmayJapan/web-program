<?php
require_once 'dbManager.php';

try {
    $pdo = getDatabaseConnection();

    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    $stmt = $pdo -> prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt -> bindParam(':username' , $username);
    $stmt -> bindParam(':email', $email);
    $stmt -> bindParam(':password', $password);
    $stmt -> execute();

    echo json_encode(['success' => true, 'message' => 'Registration successful']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e -> getMessage()]);
}
?>
