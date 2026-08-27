<?php 

namespace App\Controllers;

use App\Models\Lending;
use Exception;

class ReturnBorrowings
{
    public function return() 
    {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $lendingID = $data['lending_id'];

        try {
            Lending::returnBook(Lending::getBookID($lendingID));
            Lending::deleteLendingData($lendingID);
        } catch (Exception $e) {
            http_response_code(500);

            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}