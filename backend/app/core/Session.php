<?php
namespace App\Core;

class Session
{
    public static function set(string $sessionId): void
    {
        setcookie('session_id', $sessionId, [
            'expires' => time() + 86400,
            'path' => '/',
            'httponly' => true,
            'secure' => false,
            'samesite' => 'Lax'
        ]);
    }

    public static function get(): ?string
    {
        return $_COOKIE['session_id'] ?? null;
    }

    public static function destroy(): void
    {
        setcookie('session_id', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'httponly' => true,
            'secure' => true,
            'samesite' => 'Lax'
        ]);
    }
}