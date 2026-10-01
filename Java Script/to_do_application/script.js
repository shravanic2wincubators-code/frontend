const API_URL = "http://192.168.1.12:8090/api/v1/tasks";

// Email
const USER_EMAIL = "gaurav@gmail.com";

const todayDate = document.getElementById("todayDate");

let newTaskBtn = document.querySelector(".new-task-btn");

let taskModal = document.querySelector("#taskModal");

let addTaskBtn = document.querySelector("#saveTaskBtn");

let taskSection = document.querySelector(".task-section");

let totalCount = document.querySelector("#total-count");

let pendingCount = document.querySelector("#pending-count");

let completedCount = document.querySelector("#completed-count");

let deleteModal = document.querySelector("#deleteModal");

let cancelDelete = document.querySelector("#cancelDelete");

let confirmDelete = document.querySelector("#confirmDelete");

let taskToDelete = null;

let editingTask = null;

let taskModalTitle = document.querySelector("#taskModalTitle");

let saveTaskBtn = document.querySelector("#saveTaskBtn");

let taskTitleInput = document.querySelector("#taskTitleInput");

let taskDescriptionInput = document.querySelector("#taskDescriptionInput");

let startDateInput = document.querySelector("#startDateInput");

let dueDateInput = document.querySelector("#dueDateInput");


// Task card HTML template
const taskTemplate = document.querySelector("#taskTemplate");

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

todayDate.value = `${year}-${month}-${day}`;
newTaskBtn.addEventListener(
    "click",
    function () {
        editingTask = null;
        taskModalTitle.textContent = "Add New Task";
        saveTaskBtn.textContent = "Add Task";
        taskTitleInput.value = "";
        taskDescriptionInput.value = "";
        startDateInput.value = "";
        dueDateInput.value = "";
        taskModal.style.display = "flex";
    }
);
taskModal.addEventListener(
    "click",
    function (event) {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
            editingTask = null;
        }
    }
);

function renderTaskCard(task) {
    const taskCard = taskTemplate.content.firstElementChild.cloneNode(true);
    taskCard.dataset.id = task.id;
    const checkbox = taskCard.querySelector(".task-checkbox");
    const title = taskCard.querySelector(".task-title");
    const description = taskCard.querySelector(".task-description");
    const dateText = taskCard.querySelector(".date-text");
    const status = taskCard.querySelector(".status");
    title.textContent = task.title || "";
    description.textContent = task.description || "";
    dateText.textContent = `▣ ${task.startDate || ""} ↔ ${task.dueDate || ""}`;
    if (task.status === "COMPLETED") {
        checkbox.checked = true;
        status.textContent = "Completed";
        status.classList.remove("pending");
        status.classList.add("completed");
    } else {
        checkbox.checked = false;
        status.textContent = "Pending";
        status.classList.remove("completed");
        status.classList.add("pending");
    }
    taskSection.appendChild(taskCard);
}
addTaskBtn.addEventListener(
    "click",
    async function () {
        const taskTitle = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        const startDate = startDateInput.value;
        const dueDate = dueDateInput.value;
        if (taskTitle === "") {
            alert("Please enter task title");
            return;
        }
        if (editingTask !== null) {
            const taskId = editingTask.dataset.id;
            const checkbox = editingTask.querySelector(".task-checkbox");
            const status = checkbox.checked
                ? "COMPLETED"
                : "PENDING";
            const updatedTask = {
                title: taskTitle,
                description: description,
                startDate: startDate,
                dueDate: dueDate,
                status: status,
                email: USER_EMAIL
            };
            try {
                console.log("Updating Task:", taskId, updatedTask);
                //    Edit task API call
                const response =
                    await fetch(
                        `${API_URL}/${taskId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body:
                            JSON.stringify(updatedTask)
                    });
                // Check response
                if (!response.ok) {
                    throw new Error(
                        "Failed to update task"
                    );
                }
                console.log("Task Updated Successfully");
                taskModal.style.display = "none";
                editingTask = null;
                taskModalTitle.textContent = "Add New Task";
                saveTaskBtn.textContent = "Add Task";
                // Clear inputs
                taskTitleInput.value = "";
                taskDescriptionInput.value = "";
                startDateInput.value = "";
                dueDateInput.value = "";
                await getTasks();

            } catch (error) {
                console.error("EDIT API Error:", error);
                alert("Task could not be updated.");
            }
            return;
        }
        const newTask = {
            title: taskTitle,
            description: description,
            startDate: startDate,
            dueDate: dueDate,
            status: "PENDING",
            email: USER_EMAIL
        };
        try {
            console.log("Sending Task:", newTask);
            const response = await fetch(
                API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify(newTask)
                }
            );
            if (!response.ok) {
                throw new Error(
                    "Failed to create task"
                );
            }
            const data = await response.json();
            console.log(
                "Task Created Successfully:",
                data
            );
            taskModal.style.display = "none";
            taskTitleInput.value = "";
            taskDescriptionInput.value = "";
            startDateInput.value = "";
            dueDateInput.value = "";
            await getTasks();
        } catch (error) {
            console.error("POST API Error:", error);
            alert(
                "Task could not be created."
            );
        }
    }
);
taskSection.addEventListener(
    "change",
    async function (event) {

        if (!event.target.classList.contains("task-checkbox")) {
            return;
        }
        const taskCard = event.target.closest(".task-card");
        const taskId = taskCard.dataset.id;

        const title = taskCard.querySelector(".task-title").textContent;
        const description = taskCard.querySelector(".task-description").textContent;
        const dateText = taskCard.querySelector(".date-text").textContent.replace("▣ ", "").split(" ↔ ");
        const startDate = dateText[0];
        const dueDate = dateText[1];

        const newStatus = event.target.checked
            ? "COMPLETED"
            : "PENDING";
        const updatedTask = {
            title: title,
            description: description,
            startDate: startDate,
            dueDate: dueDate,
            status: newStatus,
            email: USER_EMAIL
        };
        try {
            const response = await fetch(
                `${API_URL}/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify(updatedTask)
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update task status");
            }
            // Update card UI
            const status = taskCard.querySelector(".status");
            if (newStatus === "COMPLETED") {
                status.textContent = "Completed";
                status.classList.remove("pending");
                status.classList.add("completed");
            } else {
                status.textContent = "Pending";
                status.classList.remove("completed");
                status.classList.add("pending");
            }
            // Fetch completed count from Stats API
            await getDashboardStats();
        } catch (error) {
            console.error("Status Update API Error:", error);
            event.target.checked = !event.target.checked;
            alert(
                "Task status could not be updated."
            );
        }
    }
);
async function getTasks() {

    try {
        const response = await fetch(`${API_URL}?email=${encodeURIComponent(USER_EMAIL)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
        const result = await response.json();
        console.log("GET Response:", result);
        const tasks = result.data;
        const existingCards = taskSection.querySelectorAll(".task-card");
        existingCards.forEach(
            function (card) {
                card.remove();
            }
        );
        if (!tasks || tasks.length === 0) {
            await getDashboardStats();
            return;
        }
        tasks.forEach(
            function (task) {
                renderTaskCard(task);
            }
        );
        await getDashboardStats();
    } catch (error) {
        console.error(
            "GET API Error:",
            error
        );
    }
}
async function getDashboardStats() {

    try {
        const response = await fetch(`${API_URL.replace("/tasks", "/dashboard/stats")}?email=${encodeURIComponent(USER_EMAIL)}`
        );
        if (!response.ok) {
            throw new Error(
                "Failed to fetch dashboard stats"
            );
        }
        const result = await response.json();
        console.log(
            "Dashboard Stats:",
            result
        );
        const stats = result.data;
        if (!stats) {
            console.log("No dashboard stats found");
            return;
        }
        totalCount.textContent = stats.totalTasks;
        pendingCount.textContent = stats.pendingTasks;
        completedCount.textContent = stats.completedTasks;
    } catch (error) {
        console.error("Dashboard Stats API Error:", error);
    }
}
taskSection.addEventListener(
    "click",
    function (event) {
        const deleteButton = event.target.closest(
            '.task-actions button[title="Delete"]'
        );
        if (deleteButton) {
            taskToDelete = deleteButton.closest(".task-card");
            deleteModal.style.display =
                "flex";
            return;
        }
        const editButton =
            event.target.closest('.task-actions button[title="Edit"]');
        if (editButton) {
            editingTask = editButton.closest(".task-card");
            const title = editingTask.querySelector(".task-title");
            const description = editingTask.querySelector(".task-description");
            const dateText = editingTask.querySelector(".date-text");
            taskTitleInput.value = title.textContent;
            taskDescriptionInput.value = description.textContent;
            const dateValue = dateText.textContent.replace("▣ ", "").split(" ↔ ");
            startDateInput.value = dateValue[0];
            dueDateInput.value = dateValue[1];
            taskModalTitle.textContent = "Edit Task";
            saveTaskBtn.textContent = "Save Changes";
            taskModal.style.display = "flex";
        }
    }
);
cancelDelete.addEventListener(
    "click",
    function () {
        deleteModal.style.display = "none";
        taskToDelete = null;
    }
);
confirmDelete.addEventListener(
    "click",
    async function () {
        if (!taskToDelete) {
            return;
        }
        const taskId = taskToDelete.dataset.id;
        try {
            const response = await fetch(`${API_URL}/${taskId}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            const result =await response.json();
            console.log("Delete Response:",result);
            taskToDelete.remove();
            taskToDelete = null;
            deleteModal.style.display ="none";
            getDashboardStats();
        } catch (error) {
            console.error("Delete API Error:",error);
            alert(
                "Task could not be deleted."
            );
        }
    }
);
deleteModal.addEventListener(
    "click",
    function (event) {
        if (event.target === deleteModal) {
            deleteModal.style.display ="none";
            taskToDelete = null;
        }
    }
);
getTasks();