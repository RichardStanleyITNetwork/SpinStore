/*
Group 27 - Vinyl Store
Marques Campbell (2405419) - Mon @ 6PM
Romario Porteous (2305778) - Wed @ 6PM
Dillan Ramdaine (2000199) - Wed @ 6PM
Victoria Wilson (2207197) - Wed @ 6PM
Richard Stanley (2307584) - Wed @ 6PM
*/

// Question 1b.iii
// Reset login attempts
let resetBtn = document.getElementById("resetAttemptsBtn");
if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        localStorage.setItem("loginAttempts", "0");
        alert("Login attempts reset. You may try logging in again.");
        window.location.href = "LoginRegistration.html";
    });
}


