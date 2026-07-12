const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");

// Add Task
addBtn.addEventListener("click", addTask);

// Enter key se bhi task add hoga
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    if (inputBox.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Create LI
    let li = document.createElement("li");

    // Task Text
    let span = document.createElement("span");
    span.className = "task-text";
    span.innerText = inputBox.value;

    // Buttons Container
    let actions = document.createElement("div");
    actions.className = "action-buttons";

    // Edit Button
    let editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // Append
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    listContainer.appendChild(li);

    inputBox.value = "";

    saveData();
}

// Event Delegation
listContainer.addEventListener("click", function (e) {

    // Complete Task
    if (e.target.classList.contains("task-text")) {

        e.target.parentElement.classList.toggle("completed");
        saveData();
    }

    // Delete
    else if (
        e.target.parentElement.classList.contains("delete-btn") ||
        e.target.classList.contains("delete-btn")
    ) {

        let li = e.target.closest("li");
        li.remove();
        saveData();
    }

    // Edit
    else if (
        e.target.parentElement.classList.contains("edit-btn") ||
        e.target.classList.contains("edit-btn")
    ) {

        let li = e.target.closest("li");
        let text = li.querySelector(".task-text");

        let updatedTask = prompt("Edit Task", text.innerText);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            text.innerText = updatedTask;
            saveData();
        }
    }

});

// Save Local Storage
function saveData() {

    localStorage.setItem("todo-data", listContainer.innerHTML);

}

// Load Data
function showTask() {

    listContainer.innerHTML = localStorage.getItem("todo-data") || "";

}

showTask();