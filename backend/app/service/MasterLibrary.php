<?php 

namespace App\Service;

use App\Controllers\Users;
use App\Models\Books as BookModel;
use App\Controllers\VerifyCookie;

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
}