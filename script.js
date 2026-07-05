const input = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");
const taskCount = document.querySelector(".task-count");
const clearButton = document.querySelector("#clear-btn");

function updateTaskCount() {
  const items = todoList.querySelectorAll(".todo-item");
  taskCount.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

  const emptyState = todoList.querySelector(".empty-state");
  if (items.length === 0) {
    if (!emptyState) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "empty-state";
      emptyItem.textContent = "No tasks yet. Add your first task above.";
      todoList.appendChild(emptyItem);
    }
  } else if (emptyState) {
    emptyState.remove();
  }
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "todo-item";

  const text = document.createElement("p");
  text.className = "todo-text";
  text.textContent = taskText;

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const renameButton = document.createElement("button");
  renameButton.type = "button";
  renameButton.className = "rename";
  renameButton.textContent = "Rename";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";

  actions.append(renameButton, deleteButton);
  li.append(text, actions);
  return li;
}

function addTask() {
  const taskText = input.value.trim();

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  todoList.prepend(createTaskElement(taskText));
  input.value = "";
  updateTaskCount();
}

todoList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const item = button.closest(".todo-item");
  if (!item) {
    return;
  }

  if (button.classList.contains("delete")) {
    item.remove();
    updateTaskCount();
  } else if (button.classList.contains("rename")) {
    const currentText = item.querySelector(".todo-text").textContent;
    const renamedTask = prompt("Rename task", currentText);

    if (renamedTask !== null) {
      const cleanedText = renamedTask.trim();
      if (cleanedText) {
        item.querySelector(".todo-text").textContent = cleanedText;
      } else {
        alert("Please enter a task.");
      }
    }
  }
});

addButton.addEventListener("click", addTask);

clearButton.addEventListener("click", () => {
  const items = todoList.querySelectorAll(".todo-item");
  items.forEach((item) => item.remove());
  updateTaskCount();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

updateTaskCount();
