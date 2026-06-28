let input = document.querySelector("#todo-input");
let button = document.querySelector("#add-btn");
let show = document.querySelector("#todo-list");
let emptyState = document.querySelector(".empty-state");
let taskCount = document.querySelector(".task-count");
button.addEventListener("click", () => {
  let pk = input.value;
  // console.log(pk);
  if (pk === "") {
    let hello = alert("Please Enter here task?");
    console.log(input.value);
    return;
  }
  let li = document.createElement("li");
  li.classList.add("todo-item");
  li.textContent = input.value;
  show.prepend(li);
  input.value = "";
  emptyState.remove();
  taskCount.textContent = `${show.children.length} items`;
});
