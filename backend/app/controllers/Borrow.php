<?php 

namespace App\Controllers;

use App\Models\Session as SessionModels;
use App\Core\Session;
use App\Models\Lending;
use Exception;

class Borrow
{
    public static function borrow()
    {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $bookID = $data['book_id'];
        $userID = SessionModels::checkSessionUserID(Session::get());

        try {
            Lending::addLendingBookData(
                Lending::addLending(
                    $userID,
                    date('Y-m-d'),
                    date('Y-m-d', strtotime('+1 week'))
                ),
                $bookID
            );
        } catch (Exception $e) {
            http_response_code(500);

            echo json_encode([
                'success' => false ,
                'message' => $e->getMessage()
            ]);
        }
    }
}