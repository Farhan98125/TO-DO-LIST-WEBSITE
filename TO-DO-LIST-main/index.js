document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing todo app...');
    
    var todoList = []
    var comdoList = [];
    var remList = [];
    var addButton = document.getElementById("add-button")
    var todoInput = document.getElementById("todo-input")
    var deleteAllButton = document.getElementById("delete-all")
    var allTodos = document.getElementById("all-todos");
    var deleteSButton = document.getElementById("delete-selected")

    console.log('Elements found:', {
        addButton: addButton,
        todoInput: todoInput,
        deleteAllButton: deleteAllButton,
        allTodos: allTodos,
        deleteSButton: deleteSButton
    });

    //event listners for add and delete
    if (addButton) {
        addButton.addEventListener("click", function() {
            console.log('Add button clicked');
            add();
        });
    }
    
    if (deleteAllButton) {
        deleteAllButton.addEventListener("click", function() {
            console.log('Delete all button clicked');
            deleteAll();
        });
    }
    
    if (deleteSButton) {
        deleteSButton.addEventListener("click", function() {
            console.log('Delete selected button clicked');
            deleteS();
        });
    }

    //event listeners for filtersk
    document.addEventListener('click', (e) => {
        console.log('Click event on:', e.target);
        if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
            console.log('Complete button clicked');
            completeTodo(e);
        }
        if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
            console.log('Delete button clicked');
            deleteTodo(e)
        }
        if (e.target.id == "all") {
            console.log('All filter clicked');
            viewAll();
        }
        if (e.target.id == "rem") {
            console.log('Remaining filter clicked');
            viewRemaining();
        }
        if (e.target.id == "com") {
            console.log('Completed filter clicked');
            viewCompleted();
        }

    })
    //event listner for enter key
    if (todoInput) {
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('Enter key pressed');
                add();
            }
        });
    }

    //updates the all the remaining, completed and main list
    function update() {
        comdoList = todoList.filter((ele) => {
            return ele.complete

        })
        remList = todoList.filter((ele) => {
            return !ele.complete
        })
        document.getElementById("r-count").innerText = todoList.length.toString();
        document.getElementById("c-count").innerText = comdoList.length.toString();
        console.log('Updated counts - Total:', todoList.length, 'Completed:', comdoList.length);

    }

    //adds the task in main list

    function add() {
        var value = todoInput.value;
        console.log('Adding todo:', value);
        if (value === '') {
            alert("😮 Task cannot be empty")
            return;
        }
        todoList.push({
            task: value,
            id: Date.now().toString(),
            complete: false,
        });

        todoInput.value = "";
        update();
        addinmain(todoList);
        console.log('Todo added successfully');
    }


    //renders the main list and views on the main content

    function addinmain(todoList) {
        allTodos.innerHTML = ""
        todoList.forEach(element => {
            var x = `<li id=${element.id} class="todo-item">
        <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
        <div class="todo-actions">
                    <button class="complete btn btn-success">
                        <i class=" ci bx bx-check bx-sm"></i>
                    </button>

                    <button class="delete btn btn-error" >
                        <i class="di bx bx-trash bx-sm"></i>
                    </button>
                </div>
            </li>`
            allTodos.innerHTML += x
        });
        console.log('Rendered todos:', todoList.length);
    }


    //deletes and indiviual task and update all the list
    function deleteTodo(e) {
        var deleted = e.target.parentElement.parentElement.getAttribute('id');
        console.log('Deleting todo with id:', deleted);
        todoList = todoList.filter((ele) => {
            return ele.id != deleted
        })

        update();
        addinmain(todoList);

    }

    //completes indiviaula task and updates all the list
    function completeTodo(e) {
        var completed = e.target.parentElement.parentElement.getAttribute('id');
        console.log('Completing todo with id:', completed);
        todoList.forEach((obj) => {
            if (obj.id == completed) {
                if (obj.complete == false) {
                    obj.complete = true
                    e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
                } else {
                    obj.complete = false

                    e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
                }
            }
        })

        update();
        addinmain(todoList);
    }


    //deletes all the tasks
    function deleteAll(todo) {
        console.log('Deleting all todos');
        todoList = []

        update();
        addinmain(todoList);

    }

    //deletes only completed task
    function deleteS(todo) {
        console.log('Deleting selected todos');
        todoList = todoList.filter((ele) => {
            return !ele.complete;
        })


        update();
        addinmain(todoList);

    }


    // functions for filters
    function viewCompleted() {
        console.log('Viewing completed todos');
        addinmain(comdoList);
    }

    function viewRemaining() {
        console.log('Viewing remaining todos');
        addinmain(remList);
    }
    function viewAll() {
        console.log('Viewing all todos');
        addinmain(todoList);
    }
    
    console.log('Todo app initialization complete');
});