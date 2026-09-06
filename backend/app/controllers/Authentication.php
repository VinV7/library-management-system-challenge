<?php

namespace App\Controllers;

use App\Models\Authentication as AuthModel;
use Exception;
use Ramsey\Uuid\Uuid;
use App\Core\Session as SessionCookie;
use App\Models\Session as SessionModel;


class Authentication
{
    public function login()
    {
        header('Content-Type: application/json');

        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        try {
            if (!$username || !$password) {
                throw new Exception("Username and password are required", 400);
            }

            $user = AuthModel::searchUser($username);

            if (!$user) {
                throw new Exception("User not found", 401);
            }

            if (!password_verify($password, $user['password'])) {
                throw new Exception("Password is incorrect", 401);
            }

            $uuid = Uuid::uuid4()->toString();
            $session_uid = Uuid::uuid4()->toString();

            SessionCookie::set($session_uid);

            SessionModel::saveSession($uuid, $session_uid, $user['id']);
        
            http_response_code(200);

            echo json_encode([
                'role' => $user['role'],
                'status' => 'success',
                'message' => 'Login successful'
            ]);

        } catch (Exception $e) {
            http_response_code($e->getCode() ?: 500);

            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}