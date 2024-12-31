const sendRegistrationDetails = async (data) => {
  // Sending data to the server using fetch
  const result = await fetch("http://localhost:2000/reg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  console.log(response);
  if (result.ok || result.success) {
    window.location.href = "/addtask"; // Redirect on success
  } else {
    alert(response.message);
  }
};
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();
  const checkedValue = document.querySelector(
    'input[name="gender"]:checked'
  )?.value;
  if (!checkedValue) {
    alert("Please select your gender.");
    return;
  }

  const dataSet = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    password: document.getElementById("password").value,
    gender: checkedValue,
  };
  if (
    !dataSet.fullName ||
    !dataSet.email ||
    !dataSet.phoneNumber ||
    !dataSet.password
  ) {
    alert("All fields are required.");
    return;
  }

  await sendRegistrationDetails(dataSet);
});
