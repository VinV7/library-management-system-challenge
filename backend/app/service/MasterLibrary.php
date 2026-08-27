<?php 

namespace App\Service;

use App\Controllers\Users;
use App\Models\Books as BookModel;

class MasterLibrary
{
    public static function sendData() 
    {
        $members = Users::getMembers();
        $librarians = Users::getLibrarians();

        $books = BookModel::getBooks();

        foreach ($books as &$book) {
            $book['categories'] = BookModel::getBookCategory(
                (int) $book['id']
            );
        }

        unset($book);

        http_response_code(200);
        
        echo json_encode([
            'success' => true,
            'books' => $books,
            'members' => $members,
            'librarians' => $librarians
        ]);
    }
}