<?php

class Quest
{

    private $dbconnection;

    private $dbconfig;

    public function __construct()
    {
        $this->dbconfig = include(dirname(__DIR__) . '/config/config.php');

        $stringConnection = "mysql:dbname=" . $this->dbconfig['database'] . ";host=" . $this->dbconfig['host'];

        $this->dbconnection = new \PDO($stringConnection, $this->dbconfig['username'], $this->dbconfig['password']);
    }

    public function getQuestById($id = 0)
    {
        if ($id != 0) {
            $stmt = $this->dbconnection->prepare("SELECT * FROM quest WHERE `id` = ?");
            $stmt->execute([$id]);

            $result = $stmt->fetch(\PDO::FETCH_ASSOC);

            $result['avgRating'] = $result['rating'] / $result['numOfGrades'];

            $stmt = $this->dbconnection->prepare("SELECT * FROM questImages WHERE `questId` = ?");

            $stmt->execute([$id]);

            $imageLink = dirname(__DIR__). "\server\storage\quests/".$stmt->fetch(PDO::FETCH_ASSOC)['imageName'];

            $result['imageLink'] = $imageLink;

            return $result;
        } else {
            $stmt = $this->dbconnection->query("SELECT * FROM quest");

            $dataArray = [];

            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $row['avgRating'] = $row['rating'] / $row['numOfGrades'];
                $dataArray[] = $row;
            }

            return $dataArray;
        }
    }

    public function addQuest(array $params)
    {
        $query = "INSERT INTO  quest(title,description,maxPlayers,rating,numOfGrades) VALUES (:title, :description, :maxPlayers,:rating,:numberOfGrades)";
        $insertData = [
            'title' => $params['title'],
            'description' => $params['description'],
            'maxPlayers' => $params['maxPlayers'],
            'rating' => $params['rating'],
            'numberOfGrades' => $params['numOfGrades']
        ];

        $stmt = $this->dbconnection->prepare($query);

        $questId = 0;

        try {
            $stmt->execute($insertData);
            $questId = $this->dbconnection->lastInsertId();
        }
        catch (PDOException $ex){
            return ['message' => 'error', 'errorText' => 'Ошибка при добавлении квеста', 'errorDbText' => $ex->getMessage()];
        }

        $imagequery = "INSERT INTO questimages (questId,imageName) VALUES (:questId, :imageName)";

        $imageParams = [
            'questId' => $questId,
            'imageName' => $params['imageName']
        ];

        $stmt = $this->dbconnection->prepare($imagequery);

        try {
            $stmt->execute($imageParams);
            return ['message' => 'ok'];
        }
        catch (PDOException $ex){
            return ['message' => 'error', 'errorText' => 'Ошибка при добавлении изображения к квесту', 'dbError' => $ex->getMessage()];
        }

    }

}