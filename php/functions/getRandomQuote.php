<?php
include '../config.php';
$query = $database->getRandomQuote();
$result = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);