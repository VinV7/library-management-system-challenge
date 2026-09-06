<?php 

namespace App\Service;

use App\Models\Books as BookModel;
use App\Core\Session;
use App\Controllers\CheckBorrowing;
use App\Models\Session as SessionModels;
use App\Controllers\VerifyCookie;
use App\Controllers\CheckBookAvailability;
use App\Models\Lending;
use Ramsey\Uuid\Uuid;
use Exception;

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

        $books = BookModel::getBooks();

        foreach ($books as &$book) {
            $book['categories'] = BookModel::getBookCategory(
                $book['id']
            );
        }

        unset($book);

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

    public static function borrow()
    {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $bookID = $data['book_id'];

        $cookie_session = Session::get();

        if (!$cookie_session) {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Unauthorized: Invalid session."
            ]);
            return;
        }

        $userID = SessionModels::checkSessionUserID($cookie_session);
        $userRole = SessionModels::checkSessionIDRole($cookie_session);

        if ($userID === null) {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Unauthorized: Invalid session."
            ]);
            return;
        }

        if ($userRole !== "Member") {
            http_response_code(403);
            echo json_encode([
                "success" => false,
                "message" => "Forbidden: Only members can borrow books."
            ]);
            return;
        }

        $book_availability = CheckBookAvailability::check($bookID);

        if ($book_availability['availability'] === 0 || $book_availability['stock'] === 0) {
            http_response_code(409);

            echo json_encode([
                'success' => false,
                'message' => 'Book is currently unavailable.'
            ]);

            return;
        }

        try {
            $luid = Uuid::uuid4()->toString();
            $bluid = Uuid::uuid4()->toString();

            Lending::addLending(
                $luid,
                $userID,
                date('Y-m-d'),
                date('Y-m-d', strtotime('+1 week'))
            );

            Lending::borrowBook($bookID);

            Lending::addLendingBookData(
                $bluid,
                $luid,
                $bookID
            );

            echo json_encode([
                'success' => true,
                'message' => 'Book borrowed successfully.'
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);

            echo json_encode([
                'success' => false ,
                'message' => $e->getMessage()
            ]);
        }
    }
}