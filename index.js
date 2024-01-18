document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    var taskInput = document.getElementById('task');
    var taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        var taskId = Date.now().toString();
        var li = document.createElement('li');
        li.id = taskId;
        li.innerHTML = '<span class="task-content">' + taskInput.value + '</span>' +
            '<button onclick="editTask(\'' + taskId + '\')">Edit</button>' +
            '<button onclick="deleteTask(\'' + taskId + '\')">Delete</button>';
        taskList.appendChild(li);

        saveTasks();
        taskInput.value = '';
    }
}

function editTask(taskId) {
    var taskItem = document.getElementById(taskId);
    var taskContent = taskItem.querySelector('.task-content');
    var newText = prompt('Edit task:', taskContent.innerText);

    if (newText !== null) {
        taskContent.innerText = newText;
        saveTasks();
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        var taskItem = document.getElementById(taskId);
        taskItem.remove();
        saveTasks();
    }
}

function saveTasks() {
    var tasks = [];
    var taskList = document.getElementById('task-list');
    var taskItems = taskList.getElementsByTagName('li');

    for (var i = 0; i < taskItems.length; i++) {
        var taskId = taskItems[i].id;
        var taskContent = taskItems[i].querySelector('.task-content').innerText;
        tasks.push({ id: taskId, text: taskContent });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById('task-list');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement('li');
        li.id = tasks[i].id;
        li.innerHTML = '<span class="task-content">' + tasks[i].text + '</span>' +
            '<button onclick="editTask(\'' + tasks[i].id + '\')">Edit</button>' +
            '<button onclick="deleteTask(\'' + tasks[i].id + '\')">Delete</button>';
        taskList.appendChild(li);
    }
}