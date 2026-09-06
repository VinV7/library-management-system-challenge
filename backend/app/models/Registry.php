<?php 

namespace App\Models;

use App\Core\Database;
use PDO;

class Registry
{
    public static function checkUser(string $email): array|bool
    {
        $db = Database::connection();

        $sql = "SELECT * FROM users WHERE email = :email";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'email' => $email
        ]);

        return $stmt->fetch();
    }

    public static function registerUser(string $id, string $email, string $username, string $password)
    {
        $db = Database::connection();

        $sql = "
            INSERT INTO users (
                id,
                email,
                name,
                password,
                role
            )
            VALUES (
                :id,
                :email,
                :username,
                :password,
                :role
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            "id" => $id,
            "email" => $email,
            "username" => $username,
            "password" => $password,
            "role" => "Member"
        ]);
    }

    public static function registerLibrarian(string $id, string $email, string $username, string $password): int
    {
        $db = Database::connection();

        $sql = "
            INSERT INTO users (
                id,
                email,
                name,
                password,
                role
            )
            VALUES (
                :id,
                :email,
                :username,
                :password,
                :role
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            "id" => $id, 
            "email" => $email,
            "username" => $username,
            "password" => $password,
            "role" => "Librarian"
        ]);

        return (int) $db->lastInsertId();
    }
}