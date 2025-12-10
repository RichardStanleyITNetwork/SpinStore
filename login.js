/*
Group 27 - Vinyl Store
Marques Campbell (2405419) - Mon @ 6PM
Romario Porteous (2305778) - Wed @ 6PM
Dillan Ramdaine (2000199) - Wed @ 6PM
Victoria Wilson (2207197) - Wed @ 6PM
Richard Stanley (2307584) - Wed @ 6PM
*/

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

    let firstName = document.getElementById("regFirst").value.trim();
    let lastName = document.getElementById("regLast").value.trim();
    let dob = document.getElementById("regDOB").value.trim();
    let gender = document.getElementById("regGender").value.trim();
    let phone = document.getElementById("regPhone").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let trn = document.getElementById("regTRN").value.trim();
    let pass = document.getElementById("regPass").value.trim();

    let error = document.getElementById("regError");
    error.textContent = "";

    if (!firstName || !lastName || !dob || !gender || !phone || !email || !trn || !pass) {
        error.textContent = "All fields are required.";
        return;
    }

    if (phone.length < 9) {
        error.textContent = "Phone number must be at least 9 digits";
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        error.textContent = "Invalid email address.";
        return;
    }

    if (pass.length < 8) {
        error.textContent = "Password must be at least 8 characters.";
        return;
    }

    let birthDate = new Date(dob);
    let age = new Date().getFullYear() - birthDate.getFullYear();
    let monthDiff = new Date().getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18) {
        error.textContent = "You must be at least 18 years old.";
        return;
    }

    // TRN validation: exactly 9 digits
    let trnPattern = /^\d{9}$/;
    if (!trnPattern.test(trn)) {
        error.textContent = "TRN must be exactly 9 digits.";
        return;
    }

    // Load existing registration data
    let regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    if (regData.some(u => u.trn === trn)) {
        error.textContent = "TRN already registered!";
        return;
    }

    let userObj = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        gender: gender,
        phone: phone,
        email: email,
        trn: trn,
        password: pass,
        dateRegistered: new Date().toLocaleDateString(),
        cart: {},
        invoices: []
    };

    regData.push(userObj);
    localStorage.setItem("RegistrationData", JSON.stringify(regData));

    alert("Registration successful! You may now log in.");
    document.getElementById("loginTab").click();
});

// Cancel registration
document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("registerForm").reset();
});

// --- LOGIN ---
if (!localStorage.getItem("loginAttempts")) {
    localStorage.setItem("loginAttempts", "0");
}

document.getElementById("loginBtn").addEventListener("click", () => {
    let loginTRN = document.getElementById("loginTRN").value.trim();
    let loginPass = document.getElementById("loginPass").value.trim();
    let error = document.getElementById("loginError");
    error.textContent = "";

    let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;

    if (attempts >= 3) {
        window.location.href = "errorLockedAccount.html";
        return;
    }

    let regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let user = regData.find(u => u.trn === loginTRN);

    if (!user || user.password !== loginPass) {
        attempts++;
        alert("Invalid TRN or Password");
        localStorage.setItem("loginAttempts", attempts.toString());
        checkLock();
        return;
    } else {
        localStorage.setItem("currentUserTRN", user.trn); 
    }

    // Successful login
    alert("Login successful!");

    localStorage.setItem("loggedInTRN", loginTRN);

    localStorage.setItem("loginAttempts", "0"); //should reset attempts
    window.location.href = "products.html";
});

function checkLock() {
    let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
    if (attempts >= 3) 
    {
        window.location.href = "errorLockedAccount.html";
    }
}

// Cancel login
document.getElementById("loginCancelBtn").addEventListener("click", () => {
    document.getElementById("loginForm").reset();
});

// --- RESET PASSWORD ---
document.getElementById("resetPasswordLink").addEventListener("click", () => {
    let trn = prompt("Enter your TRN to reset password:");
    if (!trn) return;

    let regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let user = regData.find(u => u.trn === loggedTRN);

    if (!user) {
        alert("TRN not found.");
        return;
    }

    let newPass = prompt("Enter new password (min 8 characters):");
    if (!newPass || newPass.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    user.password = newPass;
    localStorage.setItem("RegistrationData", JSON.stringify(regData));

    alert("Password updated successfully!");
});

