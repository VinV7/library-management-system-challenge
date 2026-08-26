<?php 

class Register
{
    public function register()
    {       
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $dirty_email = $data['email'];
        $username = $data['username'];
        $password = $data['password'];

        $clean_email = filter_var($dirty_email, FILTER_SANITIZE_EMAIL);

        try {
            if (!$clean_email) {
                throw new Exception("Email is invalid or empty", 401);
            } 
            if (!filter_var($clean_email)) {
                throw new Exception("Email is invalid or empty", 401);
            } 
            if (!$username) {
                throw new Exception("Username is empty", 401);
            } 
            if (!$password) {
                throw new Exception("Password is empty", 401); 
            }


            
        } catch (Exception $e) {
            echo json_encode([
                "success" => false,
                "message" => $e->getMessage(),
                "code" => $e->getCode()
            ]);
        }
    }
}