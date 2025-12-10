/*
Group 27 - Vinyl Store
Marques Campbell (2405419) - Mon @ 6PM
Romario Porteous (2305778) - Wed @ 6PM
Dillan Ramdaine (2000199) - Wed @ 6PM
Victoria Wilson (2207197) - Wed @ 6PM
Richard Stanley (2307584) - Wed @ 6PM
*/

// Elements
const userFreqOutput = document.getElementById("userFreqOutput");
const allInvoicesOutput = document.getElementById("allInvoicesOutput");
const userInvoicesOutput = document.getElementById("userInvoicesOutput");

const showUserFreqBtn = document.getElementById("showUserFreqBtn");
const showAllInvoicesBtn = document.getElementById("showAllInvoicesBtn");
const searchUserInvoicesBtn = document.getElementById("searchUserInvoicesBtn");
const searchTRNInput = document.getElementById("searchTRNInput");

// Question 6A
function ShowUserFrequency() {
    const regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    const genderCount = { Male: 0, Female: 0, Other: 0 };
    const ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };
    const today = new Date();

    regData.forEach(user => {
        // Gender
        if (genderCount.hasOwnProperty(user.gender)) genderCount[user.gender]++;
        else genderCount.Other++;

        // Age group
        const birthDate = new Date(user.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;

        if (age >= 18 && age <= 25) ageGroups["18-25"]++;
        else if (age >= 26 && age <= 35) ageGroups["26-35"]++;
        else if (age >= 36 && age <= 50) ageGroups["36-50"]++;
        else if (age > 50) ageGroups["50+"]++;
    });

    userFreqOutput.textContent = `User Frequency by Gender:\n${JSON.stringify(genderCount, null, 2)}\n\nAge Groups:\n${JSON.stringify(ageGroups, null, 2)}`;
}

// Question 6B
function ShowInvoices() {
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    if (allInvoices.length === 0) {
        allInvoicesOutput.textContent = "No invoices found.";
        return;
    }

    allInvoicesOutput.textContent = allInvoices.map(inv => {
        return `Invoice #: ${inv.invoiceNumber}, Date: ${inv.date}, Customer: ${inv.customerName || "Guest"}, TRN: ${inv.trn || "Guest"}, Total: $${inv.total.toFixed(2)}`;
    }).join("\n");
}

// Question 6C
function GetUserInvoices(trn) {
    if (!trn) {
        userInvoicesOutput.textContent = "Please enter a TRN.";
        return;
    }

    const regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    const user = regData.find(u => u.trn === trn);

    if (!user || !user.invoices || user.invoices.length === 0) {
        userInvoicesOutput.textContent = `No invoices found for TRN: ${trn}`;
        return;
    }

    userInvoicesOutput.textContent = user.invoices.map(inv => {
        return `Invoice #: ${inv.invoiceNumber}, Date: ${inv.date}, Total: $${inv.total.toFixed(2)}`;
    }).join("\n");
}

// --- Event Listeners ---
showUserFreqBtn.addEventListener("click", ShowUserFrequency);
showAllInvoicesBtn.addEventListener("click", ShowInvoices);
searchUserInvoicesBtn.addEventListener("click", () => {
    const trn = searchTRNInput.value.trim();
    GetUserInvoices(trn);
});


