const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
});

// Add task to list
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    if (title && dueDate) {
        const task = { title, description, dueDate, completed: false };
        addTaskToList(task);
        saveTask(task);
        taskForm.reset();
    } else {
        alert('Please enter a title and due date for the task.');
    }
});

// Add task to the DOM
function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="task${taskList.children.length + 1}" ${task.completed ? 'checked' : ''}>
        <label for="task${taskList.children.length + 1}" class="${task.completed ? 'completed' : ''}">
            <strong>${task.title}</strong>
            <span>${task.description}</span>
            <span>${task.dueDate}</span>
        </label>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);

    // Check if task is overdue
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);
    if (dueDate < currentDate) {
        li.classList.add('overdue');
    }
}

// Save task to localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from list and localStorage
function deleteTask(button) {
    const li = button.parentElement;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = Array.from(li.parentElement.children).indexOf(li);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.remove();
}
