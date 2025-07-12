const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const editSection = document.getElementById("edit-form-section");
const addSection = document.getElementById("add-form-section");

if (id) {
  // SHOW EDIT FORM
  editSection.style.display = "block";
  addSection.style.display = "none";

  const emp = employees.find(e => e.id === id);
  if (!emp) {
    alert("Employee not found");
    window.location.href = "index.html";
  }

  document.getElementById("first-name").value = emp.firstName;
  document.getElementById("last-name").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;

  document.getElementById("edit-employee-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const updatedEmp = {
      id: id,
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      department: document.getElementById("department").value,
      role: document.getElementById("role").value,
    };

    const index = employees.findIndex(e => e.id === id);
    employees[index] = updatedEmp;
    localStorage.setItem("employees", JSON.stringify(employees));

    window.location.href = "index.html";
  });

  document.getElementById("cancel-edit").addEventListener("click", () => {
    window.location.href = "index.html";
  });

} else {
  // SHOW ADD FORM
  editSection.style.display = "none";
  addSection.style.display = "block";

  document.getElementById("add-employee-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const newEmp = {
      id: Date.now(),
      firstName: document.getElementById("add-first-name").value,
      lastName: document.getElementById("add-last-name").value,
      email: document.getElementById("add-email").value,
      department: document.getElementById("add-department").value,
      role: document.getElementById("add-role").value,
    };

    employees.push(newEmp);
    localStorage.setItem("employees", JSON.stringify(employees));
    window.location.href = "index.html";
  });

  document.getElementById("cancel-add").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
