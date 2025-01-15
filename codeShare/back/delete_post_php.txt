<?php
session_start();
require_once 'dbManager.php';

try {
    $pdo = getDatabaseConnection();

    $post_id = isset($_POST['post_id']) ? $_POST['post_id'] : null;
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    if (!$post_id || !$user_id) {
        echo json_encode(['success' => false, 'message' => 'Missing post ID or user authentication.']);
        exit;
    }

    $stmt = $pdo -> prepare("DELETE FROM posts WHERE post_id = :post_id and user_id = :user_id");
    $stmt -> bindParam(':post_id', $post_id);
    $stmt -> bindParam(':user_id', $user_id);
    $stmt -> execute();

    if ($stmt -> rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Post deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Post not found or permission denided.']);
    }
} catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e -> getMessage()]);
}
?>
