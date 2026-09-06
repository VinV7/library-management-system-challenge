<?php 

namespace App\Service;

use App\Models\Books;
use App\Core\Session;
use App\Controllers\CheckBorrowing;
use App\Models\Session as SessionModels;
use App\Controllers\VerifyCookie;

class Member
{
    public static function sendData() 
    {
        $result = VerifyCookie::roleSpecificCookieCheck("Member");

        if ($result['cookie'] === false) {
            echo json_encode([
                'success' => true, 
                'code' => 403,
                'cookie' => false 
            ]); 

            return;
        }

        $books = Books::getBooks();

        $sessionCookie = Session::get();

        $lendings = CheckBorrowing::checkAndSend(SessionModels::checkSessionUserID($sessionCookie));

        http_response_code(200);

        echo json_encode([
            'cookie' => true,
            'success' => true, 
            'books' => $books,
            'lendings' => $lendings
        ]);
    }
}