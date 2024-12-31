const API_URL = "http://localhost:2000/gettask";
// Replace with your backend endpoint

// document
//   .getElementById("view-tasks-btn")
//   .addEventListener("click", async () => {
//     // Retrieve the token from local storage
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       alert("Token not found. Please log in.");
//       return;
//     }
// });

async function fetchTasks() {
  const token = localStorage.getItem("authToken");
  console.log(token);
  if (!token) {
    alert("Token not found. Please log in.");
    return;
  }
  console.log(token);
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); // Fetch tasks from backend
    const tasks = response.data.data || [];
    console.log(tasks);
    populateTable(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    const tbody = document.getElementById("task-tbody");
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: red;">Failed to load tasks. Please try again later.</td>
      </tr>`;
  }
}

function populateTable(tasks) {
  const tbody = document.getElementById("task-tbody");
  tbody.innerHTML = ""; // Clear existing rows

  tasks.forEach((task) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.titleTask || "Untitled"}</td>
      <td>${task.descriptionTask || "No description provided"}</td>
      <td>${task.selectedPriority || "Not set"}</td>
      <td>${
        new Date(task.deadlineTask).toLocaleDateString() || "No deadline"
      }</td>
      <td><button onclick="viewTask('${task.id}')">View</button></td>
    `;

    tbody.appendChild(row);
  });
}

function viewTask(taskId) {
  alert(`Viewing details for task ID: ${taskId}`);
}

// Load tasks on page load
fetchTasks();
