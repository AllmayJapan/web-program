<?php
session_start();
require_once 'dbManager.php';

$db = getDatabaseConnection();

if (!isset($_GET['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User ID is required']);
    exit;
}

$userId = $_GET['user_id'];
$currentUserId = $_SESSION['user_id'] ?? null; // ログイン中のユーザーID

$stmt = $db->prepare('SELECT * FROM users WHERE user_id = :userId');
$stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    $postsStmt = $db->prepare('SELECT * FROM posts WHERE user_id = :userId');
    $postsStmt->bindParam(':userId', $userId, PDO::PARAM_INT);
    $postsStmt->execute();
    $posts = $postsStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'user' => $user,
        'posts' => $posts,
        'current_user_id' => $currentUserId
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'User not found']);
}
?>

