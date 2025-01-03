<?php
require_once 'dbManager.php';

try {
	$pdo = getDatabaseConnection();
	$pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $pdo -> query("SELECT * FROM posts ORDER BY created_at DESC");
	$posts = $stmt -> fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($posts);
} catch (PDOException $e) {
	echo json_encode(['success' => false, 'message' => 'エラー: ' . $e -> getMessage()]);
}
?>
