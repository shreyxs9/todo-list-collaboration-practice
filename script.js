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
  tasks.push({ id: Date.now(), title: title, completed: false });
}

function addTask(title) {
  tasks.push({ id: Date.now(), title: title, completed: false });
}

function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (!task) return;

  const taskItem = taskList.querySelector(`[data-id="${taskId}"]`);
  const taskTitle = taskItem.querySelector(".task-title");
  const editButton = taskItem.querySelector(".task-action.edit");

  const input = document.createElement("input");
  input.type = "text";
  input.value = task.title;
  input.className = "task-edit-input";
  taskTitle.replaceWith(input);
  input.focus();

  editButton.textContent = "Save";
  editButton.classList.add("saving");

  function saveEdit() {
    const newTitle = input.value.trim();
    if (newTitle) task.title = newTitle;
    renderTasks();
  }

  editButton.onclick = (e) => { e.stopPropagation(); saveEdit(); };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") renderTasks();
  });
  input.addEventListener("blur", () => setTimeout(saveEdit, 100));
}

function deleteTask(taskId) {
  console.log("Deleting task with taskId:", taskId);
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function toggleTaskCompleted(taskId) {
  // Intern 2: switch the selected task between pending and completed.
  console.log("Toggling task completed for taskId:", taskId);
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
}

function setFilter(filterName) {
  currentFilter = filterName;
  document.querySelectorAll('.filter-button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filterName);
  });

  renderTasks();}

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

  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);

  if (event.target.classList.contains("delete")) {
    deleteTask(taskId);
    return;
  }

  if (event.target.classList.contains("edit") && !event.target.classList.contains("saving")) {
    editTask(taskId);
    return;
  }
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
