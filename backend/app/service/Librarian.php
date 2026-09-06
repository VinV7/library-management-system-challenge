<?php 

namespace App\Service;

use App\Controllers\VerifyCookie;
use App\Models\Books as BookModel;
use Exception;

class Librarian 
{
    public function sendData(): void 
    {
        header('Content-Type: application/json');

        try {
            $result = VerifyCookie::roleSpecificCookieCheck("Librarian");

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

            http_response_code(200);

            echo json_encode([
                'success' => true,
                'cookie' => true, 
                'books' => $books
            ]);
        } catch (Exception $e) {
            http_response_code(500);

            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
            

    }
}