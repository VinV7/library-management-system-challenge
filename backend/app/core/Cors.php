<?php 

namespace App\core; 

class Cors 
{
    private static string $allowedOrigin = "http://localhost:5173";

    public static function handle()
    {
        header("Access-Control-Allow-Origin: " . self::$allowedOrigin);
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");

        if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
            header("Access-Control-Max-Age: 86400");

            http_response_code(200);

            exit(0);
        }
    }
}