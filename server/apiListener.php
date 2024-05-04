<?php

header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');

ini_set('display_errors', 'off');
error_reporting(0);

require 'Models\User.php';
require 'Models\Quest.php';

//$filesPath = include(dirname(__DIR__) . '/config/config.php');

$user = new User();

$quest = new Quest();

$requestAreaArray = array_reverse(explode('/', $_SERVER['REQUEST_URI']));

$thisRequest = $requestAreaArray[2] . '/' . $requestAreaArray[1] . '/' . $requestAreaArray[0];

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

        $result = $user->auth($email, $password);

        echo json_encode($result);

        break;

    case 'api/quest/create':

        $isHaveFiles = isset($_FILES);

        if ($isHaveFiles) {
            $filename = dirname(__DIR__). "\server\storage\quests/" . basename($_FILES['questPhoto']['name']);
            if (move_uploaded_file($_FILES['questPhoto']['tmp_name'], $filename)) {
                echo json_encode(['message' => 'Картинка загружена успешно']);
            } else {
                echo json_encode(['message' => 'Картинка загружена неуспешно']);
            }
        }

        $params = [
            'title' => $_POST['title'],
            'description' => $_POST['description'],
            'maxPlayers' => $_POST['maxPlayers'],
            'rating' => $_POST['rating'],
            'numOfGrades' => $_POST['numOfGrades'],
            'imageName' => $isHaveFiles ? $_FILES['questPhoto']['name'] : 'placeholder'
        ];

        echo json_encode($quest->addQuest($params));

        break;

    case 'api/quest/read':
        $id = $_POST['id'];
        echo json_encode($quest->getQuestById($id));

        break;

        default:
            echo $thisRequest;
}