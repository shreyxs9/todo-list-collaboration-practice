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
  // Intern 2: return tasks based on currentFilter: all, pending, or completed.
  return tasks;
}

function addTask(title) {
  // Intern 1: create a task object and add it to the tasks array.
}

function editTask(taskId) {
  // Intern 1: allow the selected task title to be changed.
}

function deleteTask(taskId) {
  // Intern 2: remove the selected task from the tasks array.
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function toggleTaskCompleted(taskId) {
  // Intern 2: switch the selected task between pending and completed.
}

function setFilter(filterName) {
  // Intern 2: update currentFilter and the active filter button.
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  // Intern 1: prevent empty task names before calling addTask.
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
