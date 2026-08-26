<?php 
require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\Cors;
use App\Core\Router;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load(); 

Cors::handle();

$router = new Router();

require_once __DIR__ . '/../routes/api.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$router->dispatch($method, $uri);