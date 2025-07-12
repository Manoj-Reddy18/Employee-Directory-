// js/app.js
const listContainer = document.getElementById("employee-list");

function renderEmployees(data) {
  listContainer.innerHTML = "";
  data.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    listContainer.appendChild(card);
  });
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees(employees);
}

function editEmployee(id) {
  window.location.href = `add-edit.html?id=${id}`;
}

document.getElementById("search-input").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = employees.filter(e =>
    e.firstName.toLowerCase().includes(query) ||
    e.lastName.toLowerCase().includes(query) ||
    e.email.toLowerCase().includes(query)
  );
  renderEmployees(filtered);
});


document.addEventListener("DOMContentLoaded", function () {
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
});


document.getElementById("reset-filter").addEventListener("click", () => {
  document.getElementById("filter-firstName").value = "";
  document.getElementById("filter-department").value = "";
  document.getElementById("filter-role").value = "";
  renderEmployees(employees);
});

document.getElementById("sortSelect").addEventListener("change", (event) => {
  const value = event.target.value;

  let sorted = [...employees]; // Clone original array to avoid mutating it

  if (value === "firstName") {
    sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (value === "department") {
    sorted.sort((a, b) => a.department.localeCompare(b.department));
  }

  renderEmployees(sorted);
});



// Initial render
renderEmployees(employees);

// Toggle filter section on Filter button click
document.getElementById("filterBtn").addEventListener("click", () => {
  const section = document.getElementById("filter-section");
  section.style.display = section.style.display === "none" ? "block" : "none";
});

// Apply filter
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

// Reset filter
document.getElementById("reset-filter").addEventListener("click", () => {
  document.getElementById("filter-firstName").value = "";
  document.getElementById("filter-department").value = "";
  document.getElementById("filter-role").value = "";

  renderEmployees(employees); // Reset to full list
});

