<?php

class Comment
{
    private $dbconnection;

    private $dbconfig;

    public function __construct()
    {
        $this->dbconfig = include(dirname(__DIR__) . '/config/config.php');

        $stringConnection = "mysql:dbname=" . $this->dbconfig['database'] . ";host=" . $this->dbconfig['host'] . ';charset=utf8';

        $this->dbconnection = new \PDO($stringConnection, $this->dbconfig['username'], $this->dbconfig['password']);
    }

    public function getCommentsByUserId(){
        $stmt = $this->dbconnection->prepare("SELECT * FROM comment LEFT JOIN User on User.id = comment.userid LEFT JOIN questorder ON questorder.id = comment.questId");
        try {
            $stmt->execute();

            $dataArray = [];

            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $dataArray[] = $row;
            }

            return $dataArray;
        }
        catch(PDOException $ex){
            return ['message' => $ex->getMessage()];
        }
    }

    public function getCommentById($id = 0)
    {

        if ($id != 0) {
            $stmt = $this->dbconnection->prepare("SELECT * FROM comment LEFT JOIN User on User.id = comment.userid WHERE comment.questId=:srcQuest");
            try {
                $stmt->execute(['srcQuest' => $id]);

                $dataArray = [];

                while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                    $dataArray[] = $row;
                }

                return $dataArray;
            }
            catch(\PDOException $e) {
                return ['message' => $e->getMessage()];
            }
        } else {
            $stmt = $this->dbconnection->query("SELECT * FROM comment LEFT JOIN User on comment.userid = User.id LEFT JOIN quest on comment.questId = quest.id");

            try {

                $stmt->execute();
                $dataArray = [];

                while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                    $dataArray[] = $row;
                }

                return $dataArray;
            }
            catch(PDOException $ex){
                return ['message' => $ex->getMessage()];
            }
        }
    }

    public function createComment($comment, $srcQuest, $user_id,$mark)
    {
        $query = "INSERT INTO comment (questId, userid, comment, userRate) VALUES (:srcQuest, :user_id, :comment, :mark) ";
        $params = [
            ":user_id" => $user_id,
            ":srcQuest" => $srcQuest,
            ":comment" => $comment,
            ":mark" => $mark
        ];

        $stmt = $this->dbconnection->prepare($query);

        $updateQuest = "UPDATE quest SET rating = rating + :userRate, numOfGrades = numOfGrades + 1 WHERE id = :srcQuest";

        $questUpdate = $this->dbconnection->prepare($updateQuest);

        try {
            $stmt->execute($params);
            $questUpdate->execute([":srcQuest" => $srcQuest, ":userRate" => $mark]);
            return ['message' => 'Комментарий успешно добавлен'];
        } catch (\PDOException $e) {
            return ['message' => $e->getMessage()];
        }
    }
}