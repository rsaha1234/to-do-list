document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(taskInput.value);
        saveTasks();
        taskInput.value = '';
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button') || event.target.classList.contains('fa-trash-alt')) {
            deleteTask(event.target.closest('li'));
            saveTasks();
        }
    });

    taskList.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            toggleTask(event.target.parentElement.parentElement);
            saveTasks();
        }
    });

    function addTask(task) {
        const li = document.createElement('li');

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const label = document.createElement('label');
        label.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash bin icon

        taskContent.appendChild(checkbox);
        taskContent.appendChild(label);
        li.appendChild(taskContent);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function deleteTask(taskElement) {
        taskList.removeChild(taskElement);
    }

    function toggleTask(taskElement) {
        taskElement.classList.toggle('completed');
        taskElement.querySelector('input[type="checkbox"]').checked = taskElement.classList.contains('completed');
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector('label').textContent,
                completed: taskElement.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');

            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;

            const label = document.createElement('label');
            label.textContent = task.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash bin icon

            if (task.completed) {
                li.classList.add('completed');
            }

            taskContent.appendChild(checkbox);
            taskContent.appendChild(label);
            li.appendChild(taskContent);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
});
