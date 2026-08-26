<?php 

use App\Controllers\Register;

$router->post('/api/register', [Register::class, 'register']);