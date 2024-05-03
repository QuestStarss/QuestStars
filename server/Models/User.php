<?php

class User
{
    private $dbconnection;

    private $dbconfig;

    public function __construct()
    {
        $this->dbconfig = include(dirname(__DIR__).'/config/config.php');

        $stringConnection = "mysql:dbname=".$this->dbconfig['database'].";host=".$this->dbconfig['host'];

        $this->dbconnection = new \PDO($stringConnection, $this->dbconfig['username'], $this->dbconfig['password']);
    }

    public function getUserById($id = 0){
        if($id != 0){
            $stmt = $this->dbconnection->prepare("SELECT * FROM User WHERE `id` = ?");
            $stmt->execute([$id]);

            return $stmt->fetch(\PDO::FETCH_ASSOC);
        }
        else{
            $stmt = $this->dbconnection->query("SELECT * FROM User");

            $dataArray = [];

            while($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
                $dataArray[] = $row;
            }

            return $dataArray;
        }
    }

    public function createUser($name, $email, $password, $login){
        $query = "INSERT INTO User (name, email, password, login) VALUES (:name, :email, :password, :login)";
        $params = [
            ":name" => $name,
            ":email" => $email,
            ":password" => password_hash($password, PASSWORD_DEFAULT),
            ":login" => $login
        ];

        $stmt = $this->dbconnection->prepare($query);

        try {
            return $stmt->execute($params);
        }
        catch (\PDOException $e) {
            return ['message' => $e->getMessage()];
        }
    }
}