<?php
include '../config.php';

$input = json_decode(file_get_contents('php://input'), true);
$id = filter_var($input['id'], FILTER_SANITIZE_NUMBER_INT);
$text = filter_var($input['text'], FILTER_SANITIZE_STRING);
$isDone = $input['isDone'];

$database->addTask($id, $text, $isDone);
