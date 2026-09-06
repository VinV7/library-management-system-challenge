<?php

namespace App\Controllers;

use App\Models\Lending;

class CheckBorrowing
{
    public static function checkAndSend(string $memberId): array|null
    {
        $lendings = Lending::getLending($memberId);

        foreach ($lendings as $lending) {
            $today = new \DateTime();
            $dueDate = new \DateTime($lending['due_date']);

            if ($dueDate < $today && $lending['status'] !== 'Returned') {
                Lending::updateStatusFines((int) $lending['id']);
            }
        }

        return Lending::getLending($memberId);
    }
}