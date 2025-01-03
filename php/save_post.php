<?php
require_once 'dbManager.php';

try {
    $pdo = getDatabaseConnection();

    $data = json_decode(file_get_contents('php://input'), true);
    $title = $data['title'];
    $content = $data['content'];

    $stmt = $pdo -> prepare("insert into posts (title, content) values (:title, :content)");
    $stmt -> bindParam(':title', $title);
    $stmt -> bindParam(':content', $content);
    $stmt -> execute();

    echo json_encode(['success' => true, 'message' => '投稿が保存されました']);
} catch (PDOException $e) {
	echo json_encode(['success' => false, 'message' => 'エラー: ' . $e -> getMessage()]);
}
?>
