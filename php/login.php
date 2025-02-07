<?php
session_start();
require_once 'dbManager.php';

try {
    $pdo = getDatabaseConnection();

    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $pdo -> prepare("SELECT * FROM users WHERE email = :email");
    $stmt -> bindParam(':email', $email);
    $stmt -> execute();

    $user = $stmt -> fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['user_id'];
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e -> getMessage()]);
}
?>
