// --- TAB SWITCHING ---
document.getElementById("loginTab").addEventListener("click", () => {
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("registerForm").classList.remove("active");

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");
});

document.getElementById("registerTab").addEventListener("click", () => {
    document.getElementById("registerForm").classList.add("active");
    document.getElementById("loginForm").classList.remove("active");

    document.getElementById("registerTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
});


// --- REGISTRATION ---
document.getElementById("registerBtn").addEventListener("click", () => {

    let name = document.getElementById("regName").value.trim();
    let dob = document.getElementById("regDOB").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let user = document.getElementById("regUser").value.trim();
    let pass = document.getElementById("regPass").value.trim();

    let error = document.getElementById("regError");
    error.textContent = "";

    if (!name || !dob || !email || !user || !pass) {
        error.textContent = "Please fill in all fields.";
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        error.textContent = "Invalid email address.";
        return;
    }

    // Save registration info
    let userData = { name, dob, email, user, pass };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    alert("Registration Successful! You can now log in.");
});


// --- LOGIN ---
document.getElementById("loginBtn").addEventListener("click", () => {

    let loginUser = document.getElementById("loginUser").value.trim();
    let loginPass = document.getElementById("loginPass").value.trim();

    let error = document.getElementById("loginError");
    error.textContent = "";

    let savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
        error.textContent = "No registered account found.";
        return;
    }

    if (loginUser === savedUser.user && loginPass === savedUser.pass) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        error.textContent = "Incorrect username or password.";
    }
});
