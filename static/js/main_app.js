// ======= Reference to the employee list container in HTML =======
const listContainer = document.getElementById("employee-list");


// ======= Function to render employee cards in the DOM =======
function renderEmployees(data) {
  listContainer.innerHTML = ""; // Clear the list before rendering

  data.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";

    // Create card HTML with employee details and buttons
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;

    listContainer.appendChild(card); // Add the card to the DOM
  });
}


// ======= Delete employee by ID and update localStorage =======
function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id); // Remove from array
  localStorage.setItem("employees", JSON.stringify(employees)); // Persist changes
  renderEmployees(employees); // Re-render updated list
}


// ======= Navigate to the edit page with selected employee's ID =======
function editEmployee(id) {
  window.location.href = `add-edit.html?id=${id}`;
}


// ======= Search filter on input in search bar =======
document.getElementById("search-input").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = employees.filter(e =>
    e.firstName.toLowerCase().includes(query) ||
    e.lastName.toLowerCase().includes(query) ||
    e.email.toLowerCase().includes(query)
  );
  renderEmployees(filtered); // Show filtered results
});


// ======= Wait for DOM to load before attaching filter event =======
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("apply-filter").addEventListener("click", () => {
    const fName = document.getElementById("filter-firstName").value.toLowerCase();
    const dept = document.getElementById("filter-department").value.toLowerCase();
    const role = document.getElementById("filter-role").value.toLowerCase();

    // Apply filters conditionally
    const filtered = employees.filter(e =>
      (!fName || e.firstName.toLowerCase().includes(fName)) &&
      (!dept || e.department.toLowerCase().includes(dept)) &&
      (!role || e.role.toLowerCase().includes(role))
    );

    renderEmployees(filtered); // Render the filtered employee list
  });
});


// ======= Reset filter form and show full list =======
document.getElementById("reset-filter").addEventListener("click", () => {
  // Clear filter input values
  document.getElementById("filter-firstName").value = "";
  document.getElementById("filter-department").value = "";
  document.getElementById("filter-role").value = "";

  renderEmployees(employees); // Reset to original employee list
});


// ======= Sort the employee list based on selected criteria =======
document.getElementById("sortSelect").addEventListener("change", (event) => {
  const value = event.target.value;
  let sorted = [...employees]; // Clone array to avoid direct mutation

  if (value === "firstName") {
    sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (value === "department") {
    sorted.sort((a, b) => a.department.localeCompare(b.department));
  }

  renderEmployees(sorted); // Render sorted list
});


// ======= Initial render of the full employee list =======
renderEmployees(employees);


// ======= Toggle the visibility of the filter sidebar =======
document.getElementById("filterBtn").addEventListener("click", () => {
  const section = document.getElementById("filter-section");
  section.style.display = section.style.display === "none" ? "block" : "none";
});


// ======= Apply filter again for safe call outside DOMContentLoaded =======
document.getElementById("apply-filter").addEventListener("click", () => {
  const fName = document.getElementById("filter-firstName").value.toLowerCase();
  const dept = document.getElementById("filter-department").value.toLowerCase();
  const role = document.getElementById("filter-role").value.toLowerCase();

  const filtered = employees.filter(e =>
    (!fName || e.firstName.toLowerCase().includes(fName)) &&
    (!dept || e.department.toLowerCase().includes(dept)) &&
    (!role || e.role.toLowerCase().includes(role))
  );

  renderEmployees(filtered);
});


// ======= Reset filter again for safe call outside DOMContentLoaded =======
document.getElementById("reset-filter").addEventListener("click", () => {
  document.getElementById("filter-firstName").value = "";
  document.getElementById("filter-department").value = "";
  document.getElementById("filter-role").value = "";

  renderEmployees(employees); // Re-render full list
});
