<?php 

use App\Models\Registry;
use App\Core\Session;
use Ramsey\Uuid\Uuid;

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

            if (Registry::checkUser($clean_email)) {
                throw new Exception("Email already exists", 409);
            }

            Registry::registerUser($clean_email, $username, $hashed_password);

            $uuid = Uuid::uuid4();

            Session::get($uuid->toString());
            
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Account Successfully Created",
                "code" => 200
            ]);
        } catch (Exception $e) {
            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => $e->getMessage(),
                "code" => $e->getCode()
            ]);
        }
    }
}