<?php
class Database
{
    protected $dsn = "mysql:host=localhost; dbname=todo_bd";
    protected $username = 'root';
    protected $password = '';

    public function connection()
    {
        return new PDO($dsn = $this->dsn, $username = $this->username, $password = $this->password);
    }

    public function getTasks()
    {
        $pdo = $this->connection();
        $sql = "SELECT * FROM todo_list ORDER BY id DESC";
        return $pdo->query($sql);
    }

    public function addTask($id, $text, $is_done)
    {
        $pdo = $this->connection();
        $sql = "INSERT INTO todo_list(id, text, is_done) VALUES (?,?,?)";
        return $pdo->prepare($sql)->execute([$id, $text, $is_done]);
    }
    public function updateTask($id, $text, $is_done)
    {
        $pdo = $this->connection();
        $sql = "UPDATE todo_list SET text=?, is_done=? WHERE id=?";
        return $pdo->prepare($sql)->execute([$text, $is_done, $id]);
    }
    public function removeTask($id, $text, $is_done)
    {
        $pdo = $this->connection();
        $sql = "DELETE FROM todo_list WHERE id=? AND text=? AND is_done=?";
        return $pdo->prepare($sql)->execute([$text, $is_done, $id]);
    }
}
