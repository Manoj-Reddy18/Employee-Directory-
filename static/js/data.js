// static/js/data.js

// Attempt to retrieve employee data from localStorage
const stored = localStorage.getItem("employees");

// Initialize the global `employees` array
// If data exists in localStorage, parse it and use that
// Otherwise, use the default hardcoded employee list
var employees = stored
  ? JSON.parse(stored) // Convert stored JSON string to JavaScript object
  : [
      // Default employee list (used only if nothing is saved yet)
      {
        id: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        department: 'HR',
        role: 'Manager'
      },
      {
        id: 2,
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        department: 'IT',
        role: 'Developer'
      },
      {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Lee',
        email: 'charlie@example.com',
        department: 'Finance',
        role: 'Analyst'
      }
    ];
