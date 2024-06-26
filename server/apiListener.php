<?php

header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');

ini_set('display_errors', 'off');
error_reporting(0);

require 'Models\User.php';
require 'Models\Quest.php';
require 'Models\Comment.php';
require 'Models\QuestOrder.php';

//$filesPath = include(dirname(__DIR__) . '/config/config.php');

$user = new User();

$quest = new Quest();

$comments = new Comment();

$orders = new QuestOrder();

$requestAreaArray = array_reverse(explode('/', $_SERVER['REQUEST_URI']));

$thisRequest = $requestAreaArray[2] . '/' . $requestAreaArray[1] . '/' . $requestAreaArray[0];

switch ($thisRequest) {
    case 'api/user/read':
        $id = $_POST['id'];
        echo json_encode($user->getUserById($id));
        break;
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

    case 'api/user/ultimate':
        echo json_encode($user->getUsersCommentsOrders());

        break;

    case 'api/quest/create':

        $isHaveFiles = isset($_FILES);

        if ($isHaveFiles) {
            $filename = dirname(__DIR__) . "\server\storage\quests/" . basename($_FILES['questPhoto']['name']);
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
            'imageName' => $isHaveFiles ? $_FILES['questPhoto']['name'] : 'placeholder',
            'genre' => $_POST['genre'],
        ];

        echo json_encode($quest->addQuest($params));

        break;

    case 'api/quest/read':
        $id = $_POST['id'];
        $quest = $quest->getQuestById($id);
        echo json_encode($quest);


        break;

    case 'api/comment/read':
        $id = $_POST['id'];
        $commentsQuest = $comments->getCommentById($id);
        echo json_encode($commentsQuest);
        break;

    case 'api/comment/create':
        $comment = $_POST['comment'];
        $srcQuest = $_POST['srcQuest'];
        $user_id = $_POST['user_id'];
        $mark = $_POST['mark'];

        $newComment = $comments->createComment($comment, $srcQuest, $user_id, $mark);

        echo json_encode($newComment);

        break;

    case "api/comment/readbyuser":
        echo json_encode($comments->getCommentsByUserId());
        break;

    case 'api/order/read':
        $id = $_POST['id'];
        $res = $orders->getOrdersByUserId($id);
        echo json_encode($res);
        break;

    case 'api/order/create':
        $data = [];
        $data['date'] = $_POST['date'];
        $data['numberofplayers'] = $_POST['numberOfPlayers'];
        $data['totalcost'] = $_POST['totalCost'];
        $data['user_id'] = $_POST['user_id'];
        $data['quest_id'] = $_POST['quest_id'];

        $res = $orders->createOrder($data);

        echo json_encode($res);

        break;

    default:
        echo json_encode(['error' => 'Данный адрес API не существует. Попробуйте встать от компьютера и выйти в окно','sitemap' => '
        api/user/create - добавить пользователя
        api/user/read - получить данные пользователя
        api/user/auth - авторизовать пользователя
        
        api/quest/create - создать квест
        api/quest/read - получить квест
        
        api/comment/create - создать коммент
        api/comment/read - получить коммент
        ']);
        break;


}