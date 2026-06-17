const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const formMessage = document.querySelector("#form-message");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [];
let currentFilter = "all";

function renderTasks() {
  taskList.innerHTML = "";

  const visibleTasks = getVisibleTasks();

  if (visibleTasks.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "No tasks to show.";
    taskList.appendChild(emptyState);
    return;
  }

  visibleTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.dataset.id = task.id;

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    taskItem.innerHTML = `
      <input class="task-checkbox" type="checkbox" aria-label="Mark task as completed" />
      <span class="task-title"></span>
      <div class="task-actions">
        <button class="task-action edit" type="button">Edit</button>
        <button class="task-action delete" type="button">Delete</button>
      </div>
    `;

    taskItem.querySelector(".task-checkbox").checked = task.completed;
    taskItem.querySelector(".task-title").textContent = task.title;
    taskList.appendChild(taskItem);
  });
}

function getVisibleTasks() {
  if (currentFilter === "pending") {
    return tasks.filter(task => !task.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter(task => task.completed);
  }
  return tasks;
}

function addTask(title) {
  // Intern 1: create a task object and add it to the tasks array.
}

function addTask(title) {
  tasks.push({ id: Date.now(), title: title, completed: false });
}

function deleteTask(taskId) {
  // Intern 2: remove the selected task from the tasks array.
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function toggleTaskCompleted(taskId) {
  // Intern 2: switch the selected task between pending and completed.
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
  renderTasks();
}

function setFilter(filterName) {
  // Intern 2: update currentFilter and the active filter button.
  currentFilter = filterName;
  document.querySelectorAll('.filter-button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filterName);
  });

  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  if (!title) {
  formMessage.textContent = "Task name cannot be empty.";
  return;
}
formMessage.textContent = "";
 if (!title) return;
  addTask(title);
  
  taskInput.value = "";
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  const taskItem = event.target.closest(".task-item");

  if (!taskItem) {
    return;
  }

  const taskId = Number(taskItem.dataset.id);

  if (event.target.classList.contains("delete")) {
    deleteTask(taskId);
  }

  if (event.target.classList.contains("edit")) {
    editTask(taskId);
  }

  renderTasks();
});

taskList.addEventListener("change", (event) => {
  if (!event.target.classList.contains("task-checkbox")) {
    return;
  }

  const taskItem = event.target.closest(".task-item");
  toggleTaskCompleted(Number(taskItem.dataset.id));
  renderTasks();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
    renderTasks();
  });
});

renderTasks();
