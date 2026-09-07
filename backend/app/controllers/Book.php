<?php

namespace App\Controllers;

use App\Models\Books as BookModel;
use App\Models\Lending;
use Exception;
use Ramsey\Uuid\Uuid;

class Book
{

    public static function AddBook(): void
    {
        header('Content-Type: application/json');

        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $valid_genre = [
            'Sci-Fi',
            'Computer',
            'Fantasy',
            'Science',
            'Adventure'
        ];

        $title        = $data['title'] ?? null;
        $isbn         = $data['isbn'] ?? null;
        $genres       = $data['genre'] ?? [];
        $releaseDate  = $data['release_date'] ?? null;
        $author       = $data['author'] ?? null;
        $stock        = $data['stock'] ?? null;
        $availability = $data['availability'] ?? null;
        $imgLink      = $data['img_link'] ?? null;

        try {
            if (
                !$title ||
                !$isbn ||
                !$author ||
                !$releaseDate ||
                $stock === null ||
                $availability === null ||
                !$imgLink
            ) {
                throw new Exception("Missing required book information.");
            }

            if (!is_array($genres) || empty($genres)) {
                throw new Exception("At least one genre is required.");
            }

            foreach ($genres as $genre) {
                if (!in_array($genre, $valid_genre, true)) {
                    throw new Exception("Invalid genre: " . $genre);
                }
            }

            $bookID = Uuid::uuid4()->toString();

            BookModel::addBook(
                $bookID,
                $title,
                $author,
                (int) $isbn,
                (int) $stock,
                $releaseDate,
                $imgLink,
                (bool) $availability
            );

            foreach ($genres as $genre) {
                $categoryID = BookModel::checkGenre($genre);

                if ($categoryID === null) {
                    throw new Exception(
                        "Genre does not exist in categories: " . $genre
                    );
                }


                $genreID = Uuid::uuid4()->toString();

                BookModel::addGenre(
                    $genreID,
                    $categoryID,
                    $bookID
                );
            }

            http_response_code(201);

            echo json_encode([
                'success' => true,
                'message' => 'Book added successfully.',
                'book_id' => $bookID
            ]);

        } catch (Exception $e) {
            http_response_code(400);

            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public static function getBooks() 
    {
        header('Content-Type: application/json');

        try {
            $books = BookModel::getBooks();

            foreach ($books as &$book) {
                $book['categories'] = BookModel::getBookCategory(
                    (int) $book['id']
                );
            }

            unset($book);

            echo json_encode([
                'success' => true,
                'books' => $books
            ]);

        } catch (Exception $e) {
            http_response_code(500);

            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public static function updateBook()
    {
        header('Content-Type: application/json');

        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        try {
            $bookID = $data['id'] ?? null;
            $title = $data['title'] ?? null;
            $isbn = $data['isbn'] ?? null;
            $stock = $data['stock'] ?? null;
            $availability = $data['availability'] ?? null;
            $releaseDate = $data['release_date'] ?? null;
            $author = $data['author'] ?? null;
            $genres = $data['categories'] ?? [];
            $imageLink = $data['image_link'] ?? null;

            if (
                $bookID === null ||
                $title === null ||
                $isbn === null ||
                $stock === null ||
                $availability === null ||
                $releaseDate === null ||
                $author === null ||
                $imageLink === null
            ) {
                throw new Exception("Missing required book data.");
            }

            if (!is_array($genres)) {
                throw new Exception("Categories must be an array.");
            }

            $valid_genre = [
                'Sci-Fi',
                'Computer',
                'Fantasy',
                'Science',
                'Adventure'
            ];

            foreach ($genres as $genre) {
                if (!in_array($genre, $valid_genre, true)) {
                    throw new Exception("Invalid genre: " . $genre);
                }
            }

            BookModel::updateBook(
                (string) $bookID,
                (string) $title,
                (string) $author,
                (int) $isbn,
                (int) $stock,
                (string) $releaseDate,
                (string) $imageLink,
                (bool) $availability
            );

            BookModel::updateGenres(
                $bookID,
                $genres
            );

            http_response_code(200);

            echo json_encode([
                'success' => true,
                'message' => 'Book updated successfully.'
            ]);

        } catch (Exception $e) {
            http_response_code(500);

            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public static function deleteBook(): void
    {
        header('Content-Type: application/json');

        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        try {
            $bookID = $data['id'] ?? null;

            if (!$bookID) {
                throw new Exception("Deletion requires book ID");
            }

            $checkLending = Lending::getLendingByBookID($bookID);

            if ($checkLending !== null) {
                http_response_code(409);

                echo json_encode([
                    'success' => false,
                    'message' => 'Cannot delete book because it is currently being borrowed'
                ]);

                return;
            }

            BookModel::deleteBook($bookID);

            http_response_code(200);

            echo json_encode([
                'success' => true,
                'message' => 'Book deleted successfully'
            ]);

        } catch (Exception $e) {
            http_response_code(500);

            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}