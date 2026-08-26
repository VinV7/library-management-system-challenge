<?php 

namespace App\Models;

use App\Core\Database;
use PDO;

class Session
{
    public static function saveSession(string $sessionID, int $userID): void
    {
        $db = Database::connection();

        $sql = "
            INSERT INTO session (
                session_id,
                user_id
            )
            VALUES (
                :sessionID,
                :userID
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            "sessionID" => $sessionID,
            "userID" => $userID
        ]);
    }

    public static function checkSessionIDRole(string $sessionID): string
    {
        $db = Database::connection();

        $sql = "
            SELECT u.role
            FROM users u
            INNER JOIN session s ON s.user_id = u.id
            WHERE s.session_id = :session_id
            LIMIT 1
        ";

        $stmt = $db->prepare($sql);
        $stmt->execute([
            'session_id' => $sessionID
        ]);

        $role = $stmt->fetchColumn();

        return $role;
    }
}