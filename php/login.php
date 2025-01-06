<?php
require_once 'dbManager.php';

try {
    $pdo = getDatabaseConnection();

    $data = json_decode(file_get_connections('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $pdo -> prepare("select * from users where email = :email");
    $stmt -> bindParam(':email', $email);
    $stmt -> execute();

    $user = $stmt -> fetch(PDO::fetch_assoc);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e -> getMessage()]);
}
?>
