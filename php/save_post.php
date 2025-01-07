<?php
session_start();
require_once 'dbManager.php';

try {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User not logged in']);
        exit;
    }
    $pdo = getDatabaseConnection();

    $data = json_decode(file_get_contents('php://input'), true);
    $title = $data['title'];
    $content = $data['content'];
    $user_id = $_SESSION['user_id'];

    $stmt = $pdo -> prepare("insert into posts (user_id, title, content) values (:user_id, :title, :content)");
    $stmt -> bindParam(':user_id', $user_id);
    $stmt -> bindParam(':title', $title);
    $stmt -> bindParam(':content', $content);
    $stmt -> execute();

    echo json_encode(['success' => true, 'message' => '投稿が保存されました']);
} catch (PDOException $e) {
	echo json_encode(['success' => false, 'message' => 'エラー: ' . $e -> getMessage()]);
}
?>
