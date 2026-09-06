<?php 

namespace App\Models;

use App\Core\Database;
use PDO;

class Session
{
    public static function saveSession(string $id, string $sessionID, string $userID): void
    {
        $db = Database::connection();

        $sql = "
            INSERT INTO session (
                id, 
                session_id,
                user_id
            )
            VALUES (
                :id,
                :sessionID,
                :userID
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            "id" => $id,
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

    public static function checkSessionUserID(string $sessionID): ?string
    {
        $db = Database::connection();

        $sql = "
            SELECT user_id
            FROM session
            WHERE session_id = :sessionID
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'sessionID' => $sessionID
        ]);

        $userID = $stmt->fetchColumn();

        return $userID !== false ? $userID : null;
    }
}