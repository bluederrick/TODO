const text = document.querySelector(".overlay-text");

// Show text
text.classList.add("show");

// Hide text after 3 seconds
setTimeout(() => {
  text.classList.remove("show");
}, 1000);

const btn = document.getElementById("submit");
console.log(btn);

btn.addEventListener("click", function (e) {
  e.preventDefault();

  // get the login values

  // get radio values

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  axios
    .post("http://localhost:2000/login", data)
    .then((res) => {
      console.log(res.data, "API Response");

      // Check if response is successful
      if (res.data) {
        alert(res.data); // Show success message

        // Save the token to localStorage or sessionStorage
        const token = res.data.token;
        console.log(token); // Access token from res.data
        if (token) {
          localStorage.setItem("authToken", token);
        } else {
          console.error("No token received in response");
        }

        // Redirect to /task
        window.location.href = "/task"; // Use the correct path
      } else {
        alert("Error: " + res.data.message); // Show error message
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again.");
    });
});
