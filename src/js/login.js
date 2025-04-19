import { authenticateAdmin } from "./auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const isAuthenticated = await authenticateAdmin(email, password);
  if (isAuthenticated) {
    localStorage.setItem("admin", "true");
    window.location.href = "add-project.html";
  } else {
    alert("Invalid credentials");
  }
});
