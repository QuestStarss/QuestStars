<?php

class Quest
{

    private $dbconnection;

    private $dbconfig;

    public function __construct()
    {
        $this->dbconfig = include(dirname(__DIR__) . '/config/config.php');

        $stringConnection = "mysql:dbname=" . $this->dbconfig['database'] . ";host=" . $this->dbconfig['host'] . ';charset=utf8' . ';port=3306';

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

            $imageLink = dirname(__DIR__) . "\server\storage\quests/" . $stmt->fetch(PDO::FETCH_ASSOC)['imageName'];

            $result['imageLink'] = $imageLink;

            return $result;
        } else {
            $stmt = $this->dbconnection->query("SELECT * FROM quest");

            try {
                $dataArray = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                $result = [];

                foreach ($dataArray as $value) {

                    $stmt = $this->dbconnection->prepare("SELECT * FROM questImages WHERE `questId` = ?");

                    $stmt->execute([$value['id']]);

                    $imageLink = "server\\storage\\quests\\" . $stmt->fetch(PDO::FETCH_ASSOC)['imageName'];

                    $value['imageLink'] = $imageLink;

                    $value['avgRating'] = $value['rating'] / $value['numOfGrades'];

                    $result[] = $value;

                }

                return $result;
            }
            catch(PDOException $ex){
                return ['error' => $ex->getMessage()];
            }
        }
    }

    public function addQuest(array $params)
    {
        $query = "INSERT INTO  quest(title,description,maxPlayers,rating,numOfGrades,genre) VALUES (:title, :description, :maxPlayers,:rating,:numberOfGrades,:genre)";
        $insertData = [
            'title' => $params['title'],
            'description' => $params['description'],
            'maxPlayers' => $params['maxPlayers'],
            'rating' => $params['rating'],
            'numberOfGrades' => $params['numOfGrades'],
            'genre' => $params['genre']
        ];

        $stmt = $this->dbconnection->prepare($query);

        $questId = 0;

        try {
            $stmt->execute($insertData);
            $questId = $this->dbconnection->lastInsertId();
        } catch (PDOException $ex) {
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
        } catch (PDOException $ex) {
            return ['message' => 'error', 'errorText' => 'Ошибка при добавлении изображения к квесту', 'dbError' => $ex->getMessage()];
        }

    }

}