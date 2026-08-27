<?php 

namespace App\Service;

use App\Models\Books;
use App\Core\Session;
use App\Controllers\CheckBorrowing;
use App\Models\Session as SessionModels;

class Member
{
    public static function sendData() 
    {
        $books = Books::getBooks();

        $sessionCookie = Session::get();

        $lendings = CheckBorrowing::checkAndSend(SessionModels::checkSessionUserID($sessionCookie));

        http_response_code(200);

        echo json_encode([
            'success' => true, 
            'books' => $books,
            'lendings' => $lendings
        ]);
    }
}