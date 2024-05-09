<?php

class QuestOrder
{
    private $dbconnection;

    private $dbconfig;

    public function __construct()
    {
        $this->dbconfig = include(dirname(__DIR__) . '/config/config.php');

        $stringConnection = "mysql:dbname=" . $this->dbconfig['database'] . ";host=" . $this->dbconfig['host'] . ';charset=utf8';

        $this->dbconnection = new \PDO($stringConnection, $this->dbconfig['username'], $this->dbconfig['password']);
    }

    public function getOrdersByUserId($userId = 0)
    {
        if ($userId == 0) {
            $query = "SELECT * FROM questorder LEFT JOIN quest on quest.id = questorder.quest_id";

            try {
                $smt = $this->dbconnection->prepare($query);

                $smt->execute();

                $result = $smt->fetchAll(\PDO::FETCH_ASSOC);;

                return $result;
            } catch (\PDOException $e) {
                return ['error' => $e->getMessage()];
            }
        } else {
            $query = "SELECT * FROM `questorder` WHERE `user_id` = ? ORDER BY `id` DESC";

            $querytwo = "SELECT * FROM quest LEFT JOIN questorder on questorder.quest_id = quest.id WHERE questorder.user_id = ?";

            try {
                $smt = $this->dbconnection->prepare($querytwo);

                $smt->execute([$userId]);
                return $smt->fetchAll(\PDO::FETCH_ASSOC);
            } catch (\PDOException $e) {
                return ['error' => $e->getMessage()];
            }
        }
    }

    public function createOrder(array $orderData)
    {
        $createQuery = "INSERT INTO `questorder` (date, numberofplayers, totalcost, user_id, quest_id) VALUES (:date, :numberofplayers, :totalcost, :user_id, :quest_id)";
        $smt = $this->dbconnection->prepare($createQuery);
        try {
            $smt->execute($orderData);
            return ['message' => 'Заказ создан'];
        } catch (\PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}