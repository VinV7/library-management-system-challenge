<?php 

namespace App\Models;

use App\Core\Database;
use PDO;

class Authentication 
{
    public static function searchUser(string $username) {
        $db = Database::connection();

        $sql = "
            SELECT *
            FROM users
            WHERE name = :username
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'username' => $username
        ]);

        return $stmt->fetch();
    }
}