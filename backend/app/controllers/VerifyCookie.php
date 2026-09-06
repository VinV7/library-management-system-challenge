<?php

namespace App\Controllers;

use App\Core\Session;
use App\Models\Session as SessionModel;

class VerifyCookie
{
    public static function verifyCookie(): array
    {
        $sessionCookie = Session::get();

        if (!$sessionCookie) {
            return [
                'cookie' => false
            ];
        }

        $userId = SessionModel::checkSessionUserID($sessionCookie);

        if (!$userId) {
            return [
                'cookie' => false
            ];
        }

        $userRole = SessionModel::checkSessionIDRole($sessionCookie);

        switch ($userRole) {
            case 'Member':
                $page = 'member';
                break;

            case 'Librarian':
                $page = 'librarian';
                break;

            case 'Super Admin':
                $page = 'master-library';
                break;

        }

        return [
            'cookie' => true,
            'page' => $page
        ];
    }

    public function roleSpecificCookieCheck(string $rolePage): array 
    {
        $sessionCookie = Session::get();

        if (!$sessionCookie) {
            return [
                'cookie' => false
            ];
        }

        $userId = SessionModel::checkSessionUserID($sessionCookie);

        if (!$userId) {
            return [
                'cookie' => false
            ];
        }

        $userId = SessionModel::checkSessionUserID($sessionCookie);

        if (!$userId) {
            return [
                'cookie' => false
            ];
        }

        $userRole = SessionModel::checkSessionIDRole($sessionCookie);

        if ($userRole !== $rolePage) {
            return [
                'cookie' => false
            ];
        }

        return [
            'cookie' => true
        ];
    }
}