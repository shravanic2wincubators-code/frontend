const todayDate = document.getElementById("todayDate");
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
todayDate.value = `${year}-${month}-${day}`;



let newTaskBtn = document.querySelector(".new-task-btn");
let taskModal = document.querySelector("#taskModal");
let addTaskBtn = document.querySelector("#saveTaskBtn");
let taskSection = document.querySelector(".task-section");


// Counts
let totalCount = document.querySelector("#total-count");
let pendingCount = document.querySelector("#pending-count");
let completedCount = document.querySelector("#completed-count");


// Delete Popup
let deleteModal = document.querySelector("#deleteModal");
let cancelDelete = document.querySelector("#cancelDelete");
let confirmDelete = document.querySelector("#confirmDelete");

// Edit / Delete variables
let taskToDelete = null;
let editingTask = null;


// Popup elements
let taskModalTitle = document.querySelector("#taskModalTitle");
let saveTaskBtn = document.querySelector("#saveTaskBtn");

let taskTitleInput = document.querySelector("#taskTitleInput");
let taskDescriptionInput = document.querySelector("#taskDescriptionInput");
let startDateInput = document.querySelector("#startDateInput");
let dueDateInput = document.querySelector("#dueDateInput");



newTaskBtn.addEventListener("click", function () {
    // New Task mode
    editingTask = null;
    // Popup heading
    taskModalTitle.textContent = "Add New Task";
    // Button
    saveTaskBtn.textContent = "Add Task";
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    startDateInput.value = "";
    dueDateInput.value = "";
    // Popup open
    taskModal.style.display = "flex";

});



// Close Task Popup
taskModal.addEventListener("click", function (event) {

    if (event.target === taskModal) {
        taskModal.style.display = "none";


        // Edit mode reset
        editingTask = null;

    }

});

// Add Task and save changes
addTaskBtn.addEventListener("click", function () {
    // Get form values
    let taskTitle = taskTitleInput.value.trim();
    let description = taskDescriptionInput.value.trim();
    let startDate = startDateInput.value;
    let dueDate = dueDateInput.value;
    // Title validation
    if (taskTitle === "") {
        alert("Please enter task title");
        return;

    }

    // Edit existing task
    if (editingTask !== null) {
        // Update title
        editingTask.querySelector(
            ".task-details h3"
        ).textContent = taskTitle;
        // Update description
        editingTask.querySelector(
            ".task-details p"
        ).textContent = description;
        // Update date
        editingTask.querySelector(
            ".task-meta .date-text"
        ).textContent =
            `▣ ${startDate} ↔ ${dueDate}`;
        // Close popup
        taskModal.style.display = "none";
        // Reset edit mode
        editingTask = null;
        // Reset popup
        taskModalTitle.textContent = "Add New Task";
        saveTaskBtn.textContent = "Add Task";
        // Update counts
        updateTaskCounts();
        return;
    }
    //    Craete New Task
    let taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    // Left side
    let taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");
    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    // Details
    let taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    // Title
    let title = document.createElement("h3");
    title.textContent = taskTitle;

    // Description
    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    let taskMeta = document.createElement("div");
    taskMeta.classList.add("task-meta");
    // Date
    let dateText = document.createElement("span");
    dateText.classList.add("date-text");
    dateText.textContent =
        `▣ ${startDate} ↔ ${dueDate}`;

    // Status
    let status = document.createElement("span");

    status.classList.add("status", "pending");

    status.textContent = "Pending";

    taskMeta.appendChild(dateText);

    taskMeta.appendChild(status);
    taskDetails.appendChild(title);
    taskDetails.appendChild(descriptionElement);
    taskDetails.appendChild(taskMeta);
    taskLeft.appendChild(checkbox);

    taskLeft.appendChild(taskDetails);

    // Right Side

    let taskActions = document.createElement("div");

    taskActions.classList.add("task-actions");



    // Edit Button
    let editButton = document.createElement("button");

    editButton.title = "Edit";

    editButton.innerHTML =
        '<i class="fa-sharp fa-solid fa-pen"></i>';



    // Delete Button
    let deleteButton = document.createElement("button");

    deleteButton.title = "Delete";

    deleteButton.innerHTML =
        '<i class="fa-solid fa-trash"></i>';



    // Connect buttons
    taskActions.appendChild(editButton);

    taskActions.appendChild(deleteButton);
    // Complted Task Card
    taskCard.appendChild(taskLeft);
    taskCard.appendChild(taskActions);
    // Add task to Active Tasks
    taskSection.appendChild(taskCard);

    // Update counts
    updateTaskCounts();
    // Close Popup
    taskModal.style.display = "none";

    taskTitleInput.value = "";

    taskDescriptionInput.value = "";

    startDateInput.value = "";

    dueDateInput.value = "";

});
// CheckBox completed and pending count

taskSection.addEventListener("change", function (event) {
    if (event.target.classList.contains("task-checkbox")) {

        let taskCard =
            event.target.closest(".task-card");
        let status =
            taskCard.querySelector(".status");
        // Checkbox checked
        if (event.target.checked) {
            status.textContent = "Completed";
            status.classList.remove("pending");
            status.classList.add("completed");
        }

        // Checkbox unchecked
        else {
            status.textContent = "Pending";
            status.classList.remove("completed");
            status.classList.add("pending");

        }
        // Update counts
        updateTaskCounts();

    }

});
// Update counts
function updateTaskCounts() {

    // All tasks
    let allTasks = taskSection.querySelectorAll(".task-card");

    // Total
    let total = allTasks.length;


    // Completed
    let completed = taskSection.querySelectorAll(
        ".task-card .task-checkbox:checked"
    ).length;


    // Pending
    let pending = total - completed;
    // Show counts
    totalCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;

}
// Edit and delete
taskSection.addEventListener("click", function (event) {

    let deleteButton = event.target.closest(
        '.task-actions button[title="Delete"]'
    );


    if (deleteButton) {

        taskToDelete = deleteButton.closest(".task-card");
        deleteModal.style.display = "flex";
        return;

    }

    let editButton = event.target.closest(
        '.task-actions button[title="Edit"]'
    );
    if (editButton) {
        // Specific task store
        editingTask = editButton.closest(".task-card");
        // Get existing task data
        let title = editingTask.querySelector(
            ".task-details h3"
        );

        let description = editingTask.querySelector(
            ".task-details p"
        );

        let dateText = editingTask.querySelector(
            ".task-meta .date-text"
        );

        taskTitleInput.value = title.textContent;


        taskDescriptionInput.value = description.textContent;

        let dateValue = dateText.textContent.replace("▣ ", "").split(" ↔ ");


        startDateInput.value = dateValue[0];


        dueDateInput.value = dateValue[1];

        taskModalTitle.textContent = "Edit Task";


        saveTaskBtn.textContent = "Save Changes";

        // Open same popup
        taskModal.style.display = "flex";

    }

});


// Cancel and delete
cancelDelete.addEventListener("click", function () {
    deleteModal.style.display = "none";
    taskToDelete = null;

});
// Confirm delete

confirmDelete.addEventListener("click", function () {

    if (taskToDelete) {
        // Remove specific task
        taskToDelete.remove();
        // Reset
        taskToDelete = null;
        // Close popup
        deleteModal.style.display = "none";
        // Update counts
        updateTaskCounts();

    }

});
// click outside for delete popup
deleteModal.addEventListener("click", function (event) {
    if (event.target === deleteModal) {
        deleteModal.style.display = "none";
        taskToDelete = null;

    }

});
// Initial count
updateTaskCounts();