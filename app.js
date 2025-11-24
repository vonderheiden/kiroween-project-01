// Task Manager - Handles all task operations
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentEditId = null;
    }

    // Load tasks from localStorage
    loadTasks() {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Add a new task
    addTask(text) {
        const task = {
            id: Date.now(),
            text: text.trim(),
            completed: false
        };
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    // Delete a task by ID
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    // Toggle task completion status
    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    // Update task text
    updateTask(id, newText) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.text = newText.trim();
            this.saveTasks();
        }
    }

    // Get all tasks
    getAllTasks() {
        return this.tasks;
    }
}

// UI Manager - Handles all DOM operations
class UIManager {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.taskList = document.getElementById('taskList');
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.editModal = document.getElementById('editModal');
        this.editInput = document.getElementById('editInput');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        
        this.initEventListeners();
        this.renderTasks();
    }

    // Initialize all event listeners
    initEventListeners() {
        // Add task on button click
        this.addTaskBtn.addEventListener('click', () => this.handleAddTask());
        
        // Add task on Enter key press
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddTask();
            }
        });

        // Modal buttons
        this.saveEditBtn.addEventListener('click', () => this.handleSaveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeModal());
        
        // Save edit on Enter key press
        this.editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSaveEdit();
            }
        });

        // Close modal on background click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeModal();
            }
        });
    }

    // Handle adding a new task
    handleAddTask() {
        const text = this.taskInput.value.trim();
        
        if (text === '') {
            this.taskInput.focus();
            return;
        }

        const task = this.taskManager.addTask(text);
        this.taskInput.value = '';
        this.addTaskToDOM(task);
    }

    // Render all tasks
    renderTasks() {
        this.taskList.innerHTML = '';
        const tasks = this.taskManager.getAllTasks();
        tasks.forEach(task => this.addTaskToDOM(task, false));
    }

    // Add a single task to the DOM
    addTaskToDOM(task, animate = true) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        
        if (task.completed) {
            li.classList.add('completed');
        }

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => this.handleToggleTask(task.id));

        // Create task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'task-btn edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => this.handleEditTask(task.id, task.text));

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.handleDeleteTask(task.id));

        // Append all elements
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // Add to list (prepend for newest first)
        if (animate) {
            this.taskList.insertBefore(li, this.taskList.firstChild);
        } else {
            this.taskList.appendChild(li);
        }
    }

    // Handle task completion toggle
    handleToggleTask(id) {
        this.taskManager.toggleTask(id);
        const taskElement = this.taskList.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.toggle('completed');
        }
    }

    // Handle task deletion with animation
    handleDeleteTask(id) {
        const taskElement = this.taskList.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('removing');
            
            // Wait for animation to complete before removing
            setTimeout(() => {
                this.taskManager.deleteTask(id);
                taskElement.remove();
            }, 300);
        }
    }

    // Handle opening edit modal
    handleEditTask(id, currentText) {
        this.taskManager.currentEditId = id;
        this.editInput.value = currentText;
        this.openModal();
    }

    // Handle saving edited task
    handleSaveEdit() {
        const newText = this.editInput.value.trim();
        
        if (newText === '') {
            this.editInput.focus();
            return;
        }

        this.taskManager.updateTask(this.taskManager.currentEditId, newText);
        
        // Update the task text in the DOM
        const taskElement = this.taskList.querySelector(`[data-id="${this.taskManager.currentEditId}"]`);
        if (taskElement) {
            const taskText = taskElement.querySelector('.task-text');
            taskText.textContent = newText;
        }

        this.closeModal();
    }

    // Open edit modal
    openModal() {
        this.editModal.classList.add('active');
        this.editInput.focus();
    }

    // Close edit modal
    closeModal() {
        this.editModal.classList.remove('active');
        this.editInput.value = '';
        this.taskManager.currentEditId = null;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    const uiManager = new UIManager(taskManager);
});
