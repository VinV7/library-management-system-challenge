<?php 

namespace App\Models;

use App\Core\Database;
use PDO;

class Lending 
{
    public static function getLending(string $id): array|null
    {
        $db = Database::connection();

        $sql = "
            SELECT
                l.id,
                b.title,
                l.date_borrowed,
                l.due_date,
                l.status,
                l.fines
            FROM lending AS l
            INNER JOIN borrowed_books AS bb
                ON bb.lending_id = l.id
            INNER JOIN books AS b
                ON b.id = bb.book_id
            WHERE l.member_id = :id
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'id' => $id
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function updateStatusFines(int $id) 
    {
        $db = Database::connection();

        $sql = "
            UPDATE lending
            SET
                status = 'Overdue',
                fines = 100000
            WHERE id = :id
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function addLending(
        string $id, 
        string $memberID,
        string $dateBorrowed,
        string $dueDate
    ): int {
        $db = Database::connection();

        $sql = "
            INSERT INTO lending (
                id,
                member_id,
                date_borrowed,
                due_date,
                status,
                fines
            ) VALUES (
                :id
                :memberID,
                :dateBorrowed,
                :dueDate,
                :status,
                :fines
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'id' => $id, 
            'memberID' => $memberID,
            'dateBorrowed' => $dateBorrowed,
            'dueDate' => $dueDate,
            'status' => 'Borrowed',
            'fines' => 0
        ]);

        return $db->lastInsertId();
    }


    public static function addLendingBookData(
        string $id,
        string $lendingID,
        string $bookID
    ): void {
        $db = Database::connection();

        $sql = "
            INSERT INTO borrowed_books (
                id,
                lending_id,
                book_id
            ) VALUES (
                :id,
                :lendingID,
                :bookID
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'id' => $id,
            'lendingID' => $lendingID,
            'bookID' => $bookID
        ]);
    }


    // Borrow: decrease stock by 1
    public static function borrowBook(int $bookID): bool
    {
        $db = Database::connection();

        $sql = "
            UPDATE books
            SET stock = stock - 1
            WHERE id = :bookID
            AND stock > 0
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'bookID' => $bookID
        ]);

        return $stmt->rowCount() > 0;
    }


    // Return: increase stock by 1
    public static function returnBook(int $bookID): bool
    {
        $db = Database::connection();

        $sql = "
            UPDATE books
            SET stock = stock + 1
            WHERE id = :bookID
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'bookID' => $bookID
        ]);

        return $stmt->rowCount() > 0;
    }

    public static function deleteLendingData($lendingID): bool
    {
        $db = Database::connection();

        $sql = "
            DELETE FROM lending
            WHERE id = :lendingID
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'lendingID' => $lendingID
        ]);

        return $stmt->rowCount() > 0;
    }

    public static function getBookID(string $lendingID): int
    {
        $db = Database::connection();

        $sql = "
            SELECT book_id
            FROM borrowed_books
            WHERE lending_id = :lendingID
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'lendingID' => $lendingID
        ]);

        $bookID = $stmt->fetchColumn();

        if ($bookID === false) {
            throw new \Exception("Book not found for lending ID: $lendingID");
        }

        return $bookID;
    }
}