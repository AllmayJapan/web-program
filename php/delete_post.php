<?php
session_start();
require_once 'dbManager.php';
$db = getDatabaseConnection();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postId = $_POST['post_id'] ?? null;
    $currentUserId = $_session['user_id'] ?? null;

    if (!$postId || $currentUserId) {
        echo json_encode(['success' => false, 'message' => 'Invalid request']);
        exit;
    }

    $stmt = $db -> prepare('delete from posts where post_id = :postId AND user_id = :userId');
    $stmt -> bindParam(':postId', $postId, PDO::PARAM_INT);
    $stmt -> bindParam(':userId', $currentUserId, PDO::PARAM_INT);

    if ($stmt -> execute()) {
        echo json_encode(['success' => true, 'message' => 'Post deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete post']);
    }
}
?>
