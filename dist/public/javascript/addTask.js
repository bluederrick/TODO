const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelect = document.getElementById("priority");
const deadlineInput = document.getElementById("dateValue");
const description = document.getElementById("description-input");
const title = document.getElementById("title-input");
// const slide_btn = document.getElementById('slide-btn');

console.log(prioritySelect.value);
function AddTask() {
  // Get the task from input box and the selected priority
  const task = inputBox.value;
  const selectedPriority = prioritySelect.value; // Get the selected priority
  const descriptionTask = description.value; // Get desription of task
  const deadlineTask = deadlineInput.value; //
  const titleTask = title.value; // Get value of the title

  if (titleTask === "") {
    alert("Please enter your Titletask");
  } else {
    // Create a new <li> element for the task
    let li = document.createElement("li");

    li.style.background = "cadetblue";
    li.style.borderRadius = "15px";
    li.style.padding = "10px 60px";
    li.style.color = "white";
    li.style.width = "400px";
    li.style.marginTop = "10px";
    li.style.marginBottom = "10px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";

    // li.dataset.id = todo.id; // Set da=ta-id attribute

    // Set the content of the <li> based on inputBox value
    li.innerHTML = titleTask;

    // Create a new <span> element for task removal
    let span = document.createElement("span");

    // Add an image inside the <span> (× symbol to remove the task)
    span.innerHTML = `\u00d7`;

    // Apply initial styles
    span.style.padding = "4px";
    // span.style.backgroundColor = "white";
    span.style.color = "white";
    span.style.borderRadius = "40%";
    span.style.transition = "background-color 0.3s, transform 0.3s";

    // Append the <span> to the <li>

    // Add hover effect using events
    span.addEventListener("mouseover", () => {
    //   span.style.backgroundColor = "#0056b3"; // Change background on hover
      span.style.transform = "scale(1.1)"; // Slightly enlarge the span
      span.style.cursor = "pointer";
    });

    span.addEventListener("mouseout", () => {
      span.style.transform = "scale(1)"; // Reset size
    });

    li.appendChild(span);

    // Create a new button element for task updating
    let updateButton = document.createElement("button");
    updateButton.textContent = "Edit";
    //    editButton.addEventListener('click', () => editTask(todo.id));

    updateButton.textContent = "Update";
    //    updateButton.style.marginLeft = "7px";
    updateButton.style.backgroundColor = "lightblue"; // Quick style for visibility\
    updateButton.style.border = "none";
    updateButton.classList.add("update-button");
    li.appendChild(updateButton);

    // Add a click event listener for the update action
    updateButton.addEventListener("click", () => {
      if (li.isContentEditable) {
        // Save the updated content
        li.contentEditable = false;
        updateButton.textContent = "Update";
        li.style.border = "none";

        // Log the updated task (you can send it to the backend here
        const updatedTask = li.childNodes[0].nodeValue.trim(); // Get updated task text
        console.log("Updated Task:", updatedTask);

        // Optionally update the backend
        updateTaskInBackend(
          updatedTask,
          selectedPriority,
          descriptionTask,
          titleTask,
          deadlineTask
        );
      } else {
        // Make the task editable
        li.contentEditable = true;
        li.style.border = "1px dashed gray";
        li.focus();
        updateButton.textContent = "Save";
      }
    });

    // Append the <li> to the list container
    listContainer.appendChild(li);

    // Send the task and selected priority to the backend
    sendTaskToBackend(
      task,
      selectedPriority,
      descriptionTask,
      titleTask,
      deadlineTask
    );

    // Clear the input box after submission
    inputBox.value = "";
  }
}

// Listen for clicks on list items for checking/unchecking
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
  },
  false
);

// Helper function to send task and priority data to backend using Axios
function sendTaskToBackend(
  task,
  selectedPriority,
  descriptionTask,
  titleTask,
  deadlineTask
) {
  axios
    .post("http://localhost:2000/task", {
      task: task,
      selectedPriority: selectedPriority,
      deadlineTask: deadlineTask,
      descriptionTask: descriptionTask,
      titleTask: titleTask,
    })
    .then((response) => {
      // Handle the response from the backend (success)
      console.log("Task added successfully:", response.data);
    })
    .catch((error) => {
      // Handle any error (e.g., network issue or server-side issue)
      console.error("Error adding task:", error);
    });
}

//  TO delete a task from the backend

function deleteTaskFromBackend(task) {
  // Assuming you have an endpoint to delete tasks by their ID or content
  fetch("https://your-backend-api.com/tasks", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: task }), // Send the task data for deletion
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Task successfully deleted from the backend:", data);
    })
    .catch((error) => {
      console.error("Error deleting task from backend:", error);
    });
}

function slideButton() {
  var button = document.querySelector(".slide-btn");
  button.classList.toggle("slide"); // Toggle the slide class on click
}

slideButton();

function updateTaskFromBackend() {
  if (!taskId || !taskName || !taskDesc) {
    alert("All fields are required!");
    return;
  }

  // Prepare data for the request
  const updatedTask = {
    name: taskName,
    description: taskDesc,
  };

  // Send PUT request to update the task
  document
    .getElementById("update-task-btn")
    .addEventListener("click", async () => {
      // Get task details from the form
      const taskId = document.getElementById("task-id").value.trim();
      const taskName = document.getElementById("task-name").value.trim();
      const taskDesc = document.getElementById("task-desc").value.trim();

      if (!taskId || !taskName || !taskDesc) {
        alert("All fields are required!");
        return;
      }

      // Prepare data for the request
      const updatedTask = {
        name: taskName,
        description: taskDesc,
      };

      try {
        // Send PUT request using Axios
        const response = await axios.put(
          `http://your-api-endpoint/tasks/${taskId}`,
          updatedTask,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Show success message
        document.getElementById("response").innerText =
          "Task updated successfully!";
        console.log("Response:", response.data);
      } catch (error) {
        // Handle errors
        document.getElementById("response").innerText = "Error updating task.";
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    });
}

// render task to the DOM

// Render tasks to the DOM

const API_URL = "http://localhost:2000/gettask"; // Replace with your backend URL

// Fetch tasks from the backend
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  console.log(tasks);
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = task.id;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(task.id, task.text));

    li.appendChild(editButton);
    todoList.appendChild(li);
  });
}
