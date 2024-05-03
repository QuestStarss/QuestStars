<?php

header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');

require 'Models\User.php';

$user = new User();

$requestAreaArray = array_reverse(explode('/', $_SERVER['REQUEST_URI']));

$thisRequest = $requestAreaArray[2].'/'.$requestAreaArray[1].'/'.$requestAreaArray[0];

switch ($thisRequest) {
    case 'api/user/read':
        $id = $_POST['id'];
        echo json_encode($user->getUserById($id));
        return;
    case 'api/user/create':
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $login = $_POST['login'];

        echo json_encode($user->createUser($name, $email, $password, $login));

        break;

    case 'api/user/auth':
        $email = $_POST['email'];
        $password = $_POST['password'];

        $result = $user->auth($email,$password);

        echo json_encode($result);
}