<?php 

namespace App\Models;

use App\Core\Database;
use PDO; 

class Users
    {
    public static function getMembers() { 
        $db = Database::connection(); 
    
        $sql = "
            SELECT 
                id, 
                name,
                email
            FROM users 
            WHERE role = 'Member'
        "; 
    
        $stmt = $db->prepare($sql); 
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getLibrarian() 
    {
        $db = Database::connection(); 
    
        $sql = "
            SELECT 
                id, 
                name,
                email
            FROM users 
            WHERE role = 'Librarian'
        "; 
    
        $stmt = $db->prepare($sql); 
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function deleteUser(int $id)
    {
        $db = Database::connection();

        $sql = "
            DELETE 
            FROM users 
            WHERE id = :id;
        ";

        $stmt = $db->prepare($sql); 
        $stmt->execute([
            'id' => $id
        ]);
    }
}