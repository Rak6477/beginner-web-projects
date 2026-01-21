// ---------------------------
// Validate form inputs
// ---------------------------
function validateForm() {
  let name = document.getElementById("name").value.trim();
  let age = document.getElementById("age").value.trim();
  let address = document.getElementById("address").value.trim();
  let email = document.getElementById("email").value.trim();

  if (name === "") {
    alert("Name is required");
    return false;
  }
  if (age === "") {
    alert("Age is required");
    return false;
  } else if (age < 1) {
    alert("Age must not be zero or less than zero");
    return false;
  }
  if (address === "") {
    alert("Address is required");
    return false;
  }
  if (email === "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@") || !email.includes(".")) {
    alert("Invalid email address");
    return false;
  }
  return true;
}

// ---------------------------
// Show data from local storage
// ---------------------------
function showdata() {
  let userdata = JSON.parse(localStorage.getItem("userdata")) || [];

  let html = "";
  userdata.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";
    html += `
      <td>
        <button class="action-btn edit-action" onclick="updateData(${index})">Edit</button>
        <button class="action-btn delete-action" onclick="deleteData(${index})">Delete</button>
      </td>`;
    html += "</tr>";
  });

  document.querySelector("#Crudetable tbody").innerHTML = html;
}

// Load data when page loads
document.addEventListener("DOMContentLoaded", showdata);

// ---------------------------
// Add data to local storage
// ---------------------------
function AddData() {
  if (validateForm()) {
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let address = document.getElementById("address").value.trim();
    let email = document.getElementById("email").value.trim();

    let userdata = JSON.parse(localStorage.getItem("userdata")) || [];

    userdata.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem("userdata", JSON.stringify(userdata));
    showdata();
    clearForm();
    alert("User added successfully!");
  }
}

// ---------------------------
// Delete data from local storage
// ---------------------------
function deleteData(index) {
  let userdata = JSON.parse(localStorage.getItem("userdata")) || [];
  userdata.splice(index, 1); // ✅ FIXED: changed from peopleList to userdata
  localStorage.setItem("userdata", JSON.stringify(userdata));
  showdata();
  alert("Record deleted successfully!");
}

// ---------------------------
// Update/Edit data
// ---------------------------
function updateData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("edit").style.display = "inline-block";

  let userdata = JSON.parse(localStorage.getItem("userdata")) || [];

  // Fill form with selected user data
  document.getElementById("name").value = userdata[index].name;
  document.getElementById("age").value = userdata[index].age;
  document.getElementById("address").value = userdata[index].address;
  document.getElementById("email").value = userdata[index].email;

  // When clicking edit button, update the data
  document.getElementById("edit").onclick = function () {
    if (validateForm()) {
      userdata[index].name = document.getElementById("name").value.trim();
      userdata[index].age = document.getElementById("age").value.trim();
      userdata[index].address = document.getElementById("address").value.trim();
      userdata[index].email = document.getElementById("email").value.trim();

      localStorage.setItem("userdata", JSON.stringify(userdata));
      showdata();
      clearForm();

      // Reset buttons
      document.getElementById("submit").style.display = "inline-block";
      document.getElementById("edit").style.display = "none";

      alert("Record updated successfully!");
    }
  };
}

// ---------------------------
// Clear form fields
// ---------------------------
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
}
