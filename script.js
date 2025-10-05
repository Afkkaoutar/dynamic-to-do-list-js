document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask(taskText = null, save = true) {
        const text = taskText || taskInput.value.trim();
        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function() {
            taskList.removeChild(li);
            if (save) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const index = storedTasks.indexOf(text);
                if (index > -1) {
                    storedTasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(storedTasks));
                }
            }
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = '';

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') addTask();
    });

    loadTasks();
});
