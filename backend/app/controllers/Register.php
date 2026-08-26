<?php 

class Register
{
    public function register()
    {       
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $dirty_email = $data['email'] ?? null;
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        $clean_email = filter_var($dirty_email, FILTER_SANITIZE_EMAIL);

        try {
            if (!$clean_email || !filter_var($clean_email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Email is invalid or empty", 401);
            }

            if (!$username) {
                throw new Exception("Username is empty", 401);
            }

            if (!$password) {
                throw new Exception("Password is empty", 401);
            }

            $hashed_password = password_hash($password, PASSWORD_BCRYPT, ['cost' => 13]);

            Registry::checkUser();
            Registry::registerUser();
            

        } catch (Exception $e) {
            echo json_encode([
                "success" => false,
                "message" => $e->getMessage(),
                "code" => $e->getCode()
            ]);
        }
    }
}