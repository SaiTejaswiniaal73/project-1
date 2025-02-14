document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup");
    const signinForm = document.getElementById("signin");
    const switchToSignIn = document.getElementById("switchToSignIn");
    const switchToSignUp = document.getElementById("switchToSignUp");
    const guestButton = document.getElementById("guest-btn");
  
    // Toggle to Sign In Form
    switchToSignIn.addEventListener("click", () => {
      signinForm.style.display = "block";
      signupForm.style.display = "none";
    });
  
    // Toggle to Sign Up Form
    switchToSignUp.addEventListener("click", () => {
      signupForm.style.display = "block";
      signinForm.style.display = "none";
    });
  
    // Guest Login
    guestButton.addEventListener("click", () => {
      localStorage.setItem("guest", "true");
      window.location.href = "main.html"; // Redirect as guest
    });
  });
  