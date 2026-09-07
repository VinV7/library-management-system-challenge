<?php 

namespace App\Models; 

use App\Core\Database;
use Ramsey\Uuid\Uuid;
use PDO;

class Books 
{
    public static function addBook(string $id, string $title, string $author, int $isbn, int $stock, string $release_date, string $img_link, bool $availability): int
    {
        $db = Database::connection();

        $sql = "
            INSERT INTO books (
                id,
                title,
                author,
                isbn,
                stock,
                release_date,
                image_link,
                availability
            )
            VALUES (
                :id,
                :title,
                :author,
                :isbn,
                :stock,
                :release_date,
                :img_link,
                :availability
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'id'            => $id,
            ':title'        => $title,
            ':author'       => $author,
            ':isbn'         => $isbn,
            ':stock'        => $stock,
            ':release_date' => $release_date,
            ':img_link'     => $img_link,
            ':availability' => $availability
        ]);

        return $db->lastInsertId();
    }

    public static function addGenre(string $id, string $categoryID, string $bookID) {
        $db = Database::connection();

        $sql = "
            INSERT INTO book_categories (
                id,
                category_id, 
                book_id
            ) 
            VALUES (
                :id,
                :category_id,
                :book_id
            )
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':category_id', $categoryID);
        $stmt->bindParam(':book_id', $bookID);

        $stmt->execute();
    }

    public static function checkGenre(string $genre) {
        $db = Database::connection();

        $sql = "
            SELECT id FROM categories WHERE category = :category
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':category', $genre, PDO::PARAM_STR);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['id'] ?? null;
    }

    public static function getBooks() {
        $db = Database::connection();

        $stmt = $db->query("
            SELECT *
            FROM books
        ");

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getBookCategory(string $bookID) {
        $db = Database::connection();

        $sql = "
            SELECT c.category
            FROM book_categories bc
            INNER JOIN categories c
                ON bc.category_id = c.id
            WHERE bc.book_id = :book_id
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':book_id', $bookID, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public static function updateBook(
        string $bookID,
        string $title,
        string $author,
        int $isbn,
        int $stock,
        string $release_date,
        string $img_link,
        bool $availability
    ): void 
    {
        $db = Database::connection();

        $sql = "
            UPDATE books
            SET
                title = :title,
                author = :author,
                isbn = :isbn,
                stock = :stock,
                release_date = :release_date,
                image_link = :img_link,
                availability = :availability
            WHERE id = :book_id
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':author', $author, PDO::PARAM_STR);
        $stmt->bindParam(':isbn', $isbn, PDO::PARAM_INT);
        $stmt->bindParam(':stock', $stock, PDO::PARAM_INT);
        $stmt->bindParam(':release_date', $release_date, PDO::PARAM_STR);
        $stmt->bindParam(':img_link', $img_link, PDO::PARAM_STR);
        $stmt->bindParam(':availability', $availability, PDO::PARAM_BOOL);
        $stmt->bindParam(':book_id', $bookID, PDO::PARAM_STR);

        $stmt->execute();
    }

    public static function updateGenres(string $bookID, array $genres): void
    {
        $db = Database::connection();

        $sql = "
            DELETE FROM book_categories
            WHERE book_id = :book_id
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':book_id', $bookID, PDO::PARAM_STR);
        $stmt->execute();

        foreach ($genres as $genre) {
            $categoryID = self::checkGenre($genre);

            if ($categoryID === null) {
                continue;
            }

            $id = Uuid::uuid4()->toString();

            self::addGenre($id, $categoryID, $bookID);
        }
    }

    public static function checkBookAvailability(string $id)
    {
        $db = Database::connection();

        $sql = "
            SELECT stock, availability
            FROM books
            WHERE id = :id
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function deleteBook(string $id) 
    {
        $db = Database::connection();

        $sql = "
            DELETE FROM books 
            WHERE id = :id
        ";

        $stmt = $db->prepare($sql);

        $stmt->execute([
            'id' => $id
        ]);
    }
}