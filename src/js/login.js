import { authenticateAdmin } from "./auth.js";


// Handle login submission
document.addEventListener("DOMContentLoaded", () => {
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



  // Toggle password visibility
  window.togglePassword = function () {
    const passwordInput = document.getElementById("password");
    const icon = document.getElementById("eyeIcon");
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.src = "../imgs/showpassword.png";
    } else {
      passwordInput.type = "password";
      icon.src = "../imgs/hidepassword.png";
    }
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      const isAuthenticated = await authenticateAdmin(email, password);
  
      if (isAuthenticated) {
        localStorage.setItem("admin", "true");
        window.location.href = "../html/add-project.html";
      } else {
        alert("Invalid credentials");
      }
    });
  
    // Ensure the togglePassword function is bound after DOM is loaded
    document.getElementById("eyeIcon").addEventListener("click", togglePassword);
  });
});