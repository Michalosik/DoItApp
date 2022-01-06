<?php
include '../config.php';

$input = json_decode(file_get_contents('php://input'), true);
$id = filter_var($input['id'], FILTER_SANITIZE_STRING);
$text = filter_var($input['text'], FILTER_SANITIZE_STRING);
$is_done = $input['isDone'];

$database->removeTask($id, $text, $is_done);
