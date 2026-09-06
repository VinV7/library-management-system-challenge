<?php 

namespace App\Service;

use App\Controllers\Users;
use App\Models\Books as BookModel;
use App\Controllers\VerifyCookie;
use App\Models\Users as UsersModel;
use App\Models\Lending;
use Exception;

class MasterLibrary
{
    public static function sendData() 
    {
        $result = VerifyCookie::roleSpecificCookieCheck("Super Admin");

        if ($result['cookie'] === false) {
            echo json_encode([
                'success' => true, 
                'code' => 403,
                'cookie' => false 
            ]); 

            return;
        }

        $members = Users::getMembers();
        $librarians = Users::getLibrarians();

        $books = BookModel::getBooks();

        foreach ($books as &$book) {
            $book['categories'] = BookModel::getBookCategory(
                $book['id']
            );
        }

        unset($book);

        http_response_code(200);
        
        echo json_encode([
            'success' => true,
            'cookie'=> true,
            'books' => $books,
            'members' => $members,
            'librarians' => $librarians
        ]);
    }

    public static function deleteUser(): void 
    {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $id = $data['id']; 

        $lendingResult = Lending::getLending((string) $id);

        if (!empty($lendingResult)) {
            http_response_code(409);

            echo json_encode([
                'success' => false,
                'message' => 'Cannot delete user because they have existing lending records.'
            ]);

            return;
        }

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