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
}
?>
