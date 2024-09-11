document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('responseMessage').textContent = '';
    document.getElementById('spinner').style.display = 'block';  // Show spinner

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;  // Get "Remember me" value
    let isValid = true;

    
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email.';
        isValid = false;
    }

    
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    if (!isValid) {
        document.getElementById('spinner').style.display = 'none';  // Hide spinner
        return;
    }

    
    try {
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

        
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (response.ok) {
            document.getElementById('responseMessage').textContent = 'Login successful!';
            document.getElementById('responseMessage').style.color = 'green';

            // If "Remember Me" is checked, save email in localStorage
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


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


window.addEventListener('load', function () {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});


document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('darkModeToggle').textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});