// ======= Get query parameter (?id=...) to determine if editing an employee =======
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id")); // Convert to number

// ======= Select the form sections from the HTML =======
const editSection = document.getElementById("edit-form-section");
const addSection = document.getElementById("add-form-section");


// ======= If an ID is present, show edit form and populate with data =======
if (id) {
  // Show the edit form and hide the add form
  editSection.style.display = "block";
  addSection.style.display = "none";

  // Find the employee to edit from the list
  const emp = employees.find(e => e.id === id);
  if (!emp) {
    alert("Employee not found");
    window.location.href = "index.html"; // Redirect if not found
  }

  // Pre-fill the form with existing employee data
  document.getElementById("first-name").value = emp.firstName;
  document.getElementById("last-name").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;

  // Handle form submission for editing
  document.getElementById("edit-employee-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    // Create updated employee object
    const updatedEmp = {
      id: id,
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      department: document.getElementById("department").value,
      role: document.getElementById("role").value,
    };

    // Find the index and update the employee
    const index = employees.findIndex(e => e.id === id);
    employees[index] = updatedEmp;

    // Save updated list to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Redirect to main page
    window.location.href = "index.html";
  });

  // Cancel button: go back without saving
  document.getElementById("cancel-edit").addEventListener("click", () => {
    window.location.href = "index.html";
  });


// ======= If no ID in query, show Add form =======
} else {
  // Show add form and hide edit form
  editSection.style.display = "none";
  addSection.style.display = "block";

  // Handle form submission for adding new employee
  document.getElementById("add-employee-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    // Create new employee object
    const newEmp = {
      id: Date.now(), // Unique ID using timestamp
      firstName: document.getElementById("add-first-name").value,
      lastName: document.getElementById("add-last-name").value,
      email: document.getElementById("add-email").value,
      department: document.getElementById("add-department").value,
      role: document.getElementById("add-role").value,
    };

    // Add to the employees array
    employees.push(newEmp);

    // Save to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Redirect to main page
    window.location.href = "index.html";
  });

  // Cancel button: go back without adding
  document.getElementById("cancel-add").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
