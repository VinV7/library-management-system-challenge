<?php 

namespace App\Service;

use App\Controllers\VerifyCookie;
use Exception;

class Registry 
{
    public function sendData(): void 
    {
        try {
            $result = VerifyCookie::verifyCookie(); 

            if (!$result['cookie']) {
                echo json_encode([
                    'success' => true,
                    'cookie' => false
                ]);

                return;
            }

            echo json_encode([
                'success' => true, 
                'cookie' => true,
                'page' => $result['page']
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