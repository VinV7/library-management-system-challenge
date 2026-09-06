<?php 

namespace App\Controllers;

use App\Models\Books;

class CheckBookAvailability
{
    public static function check(string $bookID): array
    {
        $result = Books::checkBookAvailability($bookID);

        return [
            'availability' => (int) $result['availability'],
            'stock' => (int) $result['stock']
        ];
    }
}