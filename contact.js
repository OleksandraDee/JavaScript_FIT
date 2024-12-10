document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form submission to validate inputs

        // Clear previous errors
        clearErrors();

        // Validate each field
        const nameValid = validateName();
        const emailValid = validateEmail();
        const messageValid = validateMessage();

        // If all fields are valid, show success message
        if (nameValid && emailValid && messageValid) {
            document.getElementById("formOutput").innerText = "Message sent successfully!";
        }
    });
});

// Validation functions
function validateName() {
    const name = document.getElementById("name").value.trim();
    const error = document.getElementById("nameError");

    if (name.length < 2) {
        error.innerText = "Name must be at least 2 characters.";
        error.style.display = "block";
        return false;
    }
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const error = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        error.innerText = "Please enter a valid email address.";
        error.style.display = "block";
        return false;
    }
    return true;
}

function validateMessage() {
    const message = document.getElementById("message").value.trim();
    const error = document.getElementById("messageError");

    if (message.length < 10) {
        error.innerText = "Message must be at least 10 characters.";
        error.style.display = "block";
        return false;
    }
    return true;
}

// Clear error messages
function clearErrors() {
    document.querySelectorAll(".error").forEach((error) => {
        error.style.display = "none";
    });
}
Explanation