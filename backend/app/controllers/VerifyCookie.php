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
            case 'member':
                $page = 'member';
                break;

            case 'librarian':
                $page = 'librarian';
                break;

            case 'Super Admin':
                $page = 'master-library';
                break;
        }

        return [
            'cookie' => true,
            'role' => $userRole,
            'page' => $page
        ];
    }
}