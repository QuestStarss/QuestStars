<?php

require 'Models\User.php';

$user = new User();

print_r($_SERVER['REQUEST_URI']);

echo json_encode($user->getUserById('0'));