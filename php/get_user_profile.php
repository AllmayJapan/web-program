<?php
require_once 'dbManager.php';

try {
    $pdo = getDatabaseConnection();

    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

    if (!$user_id) {
        echo json_encode(['success' => false, 'message' => 'User ID is missing.']);
        exit;
    }

    $stmtUser = $pdo->prepare("SELECT username, created_at AS registration_date FROM users WHERE user_id = :user_id");
    $stmtUser->bindParam(':user_id', $user_id);
    $stmtUser->execute();

    $user = $stmtUser->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'User not found.']);
        exit;
    }

    $stmtPosts = $pdo -> prepare("SELECT title, content, created_at FROM posts WHERE user_id = :user_id ORDER BY created_at DESC");
    $stmtPosts -> bindParam(':user_id', $user_id);
    $stmtPosts -> execute();
    $posts = $stmtPosts -> fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'user' => $user, 'posts' => $posts]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>

