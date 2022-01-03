<?php
include '../config.php';
$query = $database->getTasks();
$result = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
