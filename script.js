
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('responseMessage').textContent = '';
    document.getElementById('spinner').style.display = 'block';  // Show spinner

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;  // Get "Remember me" value
    let isValid = true;

    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email.';
        isValid = false;
    }

    // Validate password length
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Stop submission if validation fails
    if (!isValid) {
        document.getElementById('spinner').style.display = 'none';  // Hide spinner
        return;
    }

    try {
        // Simulated API call for login
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        });

        // Simulate delay for API response
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (response.ok) {
            document.getElementById('responseMessage').textContent = 'Login successful!';
            document.getElementById('responseMessage').style.color = 'green';

            // Save email if "Remember Me" is checked
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            }
        } else {
            document.getElementById('responseMessage').textContent = 'Login failed! Please try again.';
            document.getElementById('responseMessage').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'An error occurred. Please try again later.';
        document.getElementById('responseMessage').style.color = 'red';
    } finally {
        document.getElementById('spinner').style.display = 'none';  // Hide spinner after API response
    }
});

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Load remembered email if available
window.addEventListener('load', function () {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});

// Dark mode toggle functionality
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('darkModeToggle').textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

// Show/Hide Password Functionality
document.getElementById('eyeicon').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeicon');

    // Toggle the password field type
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.src = 'assets/eye-open.jpeg'; // Update icon to "eye open"
    } else {
        passwordField.type = 'password';
        eyeIcon.src = 'assets/eye-close.jpeg'; // Update icon to "eye close"
    }
});