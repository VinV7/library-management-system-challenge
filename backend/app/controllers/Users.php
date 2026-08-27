<?php 

namespace App\Controllers;

use App\Models\Users as UsersModel;
use Exception;

class Users 
{
    public static function getMembers(): array|null
    {
        $members = UsersModel::getMembers();

        return $members;
    } 

    public static function getLibrarians(): array|null
    {
        $librarians = UsersModel::getLibrarian();
        
        return $librarians;
    }

    public static function deleteUser(): void 
    {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $id = $data['id']; 

        try {
            UsersModel::deleteUser($id);

            http_response_code(200);

            echo json_encode([
                'success' => true
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }   

    }
}