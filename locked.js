// Reset login attempts
let resetBtn = document.getElementById("resetAttemptsBtn");
if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        localStorage.setItem("loginAttempts", "0");
        alert("Login attempts reset. You may try logging in again.");
        window.location.href = "LoginRegistration.html";
    });
}
