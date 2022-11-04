// Putting all current tasks in the DOM
const putTasksInDOM = async function () {
    
    // Retrieving all task data from the server
    const allTasks = await getAllTaskData();

    // Getting To-Do list UL
    const todoList = document.getElementsByClassName("todo_list")[0]; 

    // Clearing the DOM
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    }

    // Loading all current tasks to the DOM
    allTasks.forEach((task) => {
        
        // Creating list items, delete icons, and checkboxes
        const todoItem = document.createElement("li");
        const deleteIcon = document.createElement("img");
        const taskCheckbox = document.createElement("input");
        taskCheckbox.setAttribute("type", "checkbox");

        // Styling list items, delete icons, and checkboxes
        todoItem.setAttribute("class", "todo_item");
        deleteIcon.setAttribute("src", "trash.png");
        deleteIcon.setAttribute("class", "delete_icon");
        taskCheckbox.setAttribute("class", "todo_checkbox");

        // Adding list item content and styling
        const taskContent = document.createElement("p");
        taskContent.setAttribute("class", "task_content")
        taskContent.innerText = task.content;
        
        // Structuring the To-Do List in the DOM
        todoItem.appendChild(taskCheckbox);
        todoItem.appendChild(taskContent);
        todoItem.appendChild(deleteIcon);
        todoList.appendChild(todoItem);

        // Adding task ID 
        todoItem.dataset.itemid = task._id;

        // Adding task completion status
        if (task.completed === true) {
            taskCheckbox.checked = true;
            taskCheckbox.parentElement.classList.add("task_complete")
        }

        // Adding task editing function
        taskContent.setAttribute('contentEditable', 'true')

        taskContent.addEventListener('keypress', async function (event) {
            if(event.key === 'Enter') {
            event.preventDefault();
            const taskInput = taskContent.innerText;
            const taskID = event.target.parentElement.dataset.itemid;
            const taskData = await getSingleTaskData(taskID)
            taskData.content = taskInput;
            await putSingleTaskData(taskID, taskData);
            putTasksInDOM();
            }
        })

        taskContent.onblur = async function (event) {
            const taskInput = taskContent.innerText;
            const taskID = event.target.parentElement.dataset.itemid;
            const taskData = await getSingleTaskData(taskID)
            taskData.content = taskInput;
            await putSingleTaskData(taskID, taskData);
            putTasksInDOM();
        }

        // Adding delete icon event listener
        deleteIcon.addEventListener("click", deleteTask)

        // Adding checkbox event listener
        taskCheckbox.addEventListener('click', checkTask)
    })
};

// Getting task input form
const getTaskInputField = document.getElementById("task_input");
const getTaskSubmit = document.getElementById("submit_btn");

// POST new task function
const addNewTask = function () {
    const newTask = {content: getTaskInputField.value, completed: false}
    postTaskData(newTask);
}

// Submit button functionality
getTaskSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    addNewTask();
    putTasksInDOM();
    getTaskInputField.value = "";
})

// Delete button functionality
const deleteTask = async function (event) { 
    const taskID = event.target.parentElement.dataset.itemid;
    await delTaskData(taskID);
    putTasksInDOM();
}

// Checkbox functionality
const checkTask = async function (event) {
    const taskID = event.target.parentElement.dataset.itemid;
    const targetTask = await getSingleTaskData(taskID);
    if (targetTask.completed === true) {
        targetTask.completed = false;
    } else if (targetTask.completed === false) {
        targetTask.completed = true;
    };
    await putSingleTaskData(taskID, targetTask)
    putTasksInDOM();
}

// Initial loading of page content
putTasksInDOM();

