<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DoList!</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/7a1ace2c47.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <div class="todo__container flex-center">
        <div class="todo">
            <header class="todo__header">
                <div class="todo__header-text">
                    <h1>Your task to do!</h1>
                </div>
                <div class="todo__header-info">
                    <p>You have</p>
                    <p class="bold"><span class="things-to-do"></span></p>
                    <p>things to do!</p>
                </div>
                <div class="todo__header-info">
                    <p>You have</p>
                    <p class="bold"><span class="things-done"></span> </p>
                    <p>things done!</p>
                </div>
                <form class="todo__header-form">
                    <div class="todo__header-form-control">
                        <input class="todo__header-form-input" type="text" name="goal" placeholder="What we do today?" value="" required aria-required="true" />
                        <button class="todo__header-form-btn" type="submit">Add it!</button>
                    </div>
                </form>
                <div class="shadow"></div>
            </header>
            <ul class="todo__tasks">
                <!-- <li class="todo__tasks-item" data-is-done="false" data-id="1">
                    <p>Wynająć auto1</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li>
                <li class="todo__tasks-item" data-is-done="false" data-id="2">
                    <p>Wynająć auto2</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li>
                <li class="todo__tasks-item" data-is-done="false" data-id="3">
                    <p>Wynająć auto3</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li>
                <li class="todo__tasks-item" data-is-done="true" data-id="4">
                    <p>Wynająć auto4</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li>
                <li class="todo__tasks-item" data-is-done="true" data-id="5">
                    <p>Wynająć auto5</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li>
                <li class="todo__tasks-item" data-is-done="false" data-id="6">
                    <p>Wynająć auto6</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li>
                <li class="todo__tasks-item" data-is-done="false" data-id="7">
                    <p>Wynająć auto7</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li>
                <li class="todo__tasks-item" data-is-done="false" data-id="8">
                    <p>Wynająć auto8</p>
                    <div class="todo__tasks-item-controls">
                        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
                        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
                        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
                    </div>
                </li> -->
            </ul>
        </div>

    </div>
    <script src="assets/js/main.js"></script>
</body>

</html>