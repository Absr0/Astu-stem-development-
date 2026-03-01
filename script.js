// Simulated database
let users = JSON.parse(localStorage.getItem("users")) || [
  { id: 1, name: "Admin", email: "admin@astu.edu", password: "admin", role: "admin" }
];

let items = JSON.parse(localStorage.getItem("items")) || [];

// SAVE TO LOCAL STORAGE
function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("items", JSON.stringify(items));
}

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert("Invalid credentials");

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "student.html";
    }
  });
}

// REGISTER
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    if (users.find(u => u.email === email)) {
      return alert("Email already exists");
    }

    users.push({
      id: users.length + 1,
      name,
      email,
      password,
      role: "student"
    });

    saveData();
    alert("Registered successfully!");
    window.location.href = "index.html";
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
