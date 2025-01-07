<?php
function getDatabaseConnection(){
    $host = 'db';
    $dbname = 'small_blog_db';
    $user = 'user';
    $password = 'user_password';

    try {
        $pdo = new pdo("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
        $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Failed to connect to database.: " . $e -> getMessage());
    }
}
?>
