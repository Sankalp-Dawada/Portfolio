// Non-module script for global functions
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to password toggle button
    document.getElementById('togglePasswordBtn').addEventListener('click', function() {
      const passwordInput = document.getElementById("password");
      const icon = document.getElementById("eyeIcon");
    
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.src = "../imgs/showpassword.png";
      } else {
        passwordInput.type = "password";
        icon.src = "../imgs/hidepassword.png";
      }
    });
  });