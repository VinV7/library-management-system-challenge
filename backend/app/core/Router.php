<?php

namespace App\Core;

class Router
{
    private array $routes = [];

    public function get(string $uri, array $handler): void
    {
        $this->routes['GET'][$uri] = $handler;
    }

    public function post(string $uri, array $handler): void
    {
        $this->routes['POST'][$uri] = $handler;
    }

    public function delete(string $uri, array $handler): void
    {
        $this->routes['DELETE'][$uri] = $handler;
    }


    public function dispatch(string $method, string $uri)
    {
        if (!isset($this->routes[$method][$uri])) {
            http_response_code(404);

            echo json_encode([
                "message" => "Route not Found"
            ]);

            return;
        }

        $handler = $this->routes[$method][$uri];

        [$controller, $action] = $handler;
       
        $instance = new $controller;

        echo $instance->$action();
    }
}