<?php 

use App\Controller\Register;

$router->post('api/register', [Register::class, 'register']);