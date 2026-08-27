<?php 

use App\Controllers\Register;
use App\Controllers\Authentication;
use App\Controllers\Book;
use App\Service\MasterLibrary;
use App\Service\Member;
use App\Controllers\Users;
use App\Controllers\Borrow;
use App\Controllers\ReturnBorrowings;

$router->post('/api/register', [Register::class, 'register']);
$router->post('/api/login', [Authentication::class, 'login']);
$router->post('/api/add-book', [Book::class, 'addBook']);
$router->get('/api/services/send-data/master-library', [MasterLibrary::class, 'sendData']);
$router->get('/api/get-books', [Book::class, 'getBooks']);
$router->post('/api/update-books', [Book::class, 'updateBook']);
$router->post('/api/register/librarian', [Register::class, 'registerLibrarian']);
$router->delete('/api/delete-user', [Users::class, 'deleteUser']);
$router->get('/api/services/send-data/member', [Member::class, 'sendData']);
$router->post('/api/borrow', [Borrow::class, 'borrow']);
$router->post('/api/return', [ReturnBorrowings::class, 'return']);