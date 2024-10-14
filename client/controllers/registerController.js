
const API_URL = '/api/auth'; // Replace with your API URL

// register function
async function register(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const role = document.getElementById('role').value;
    const dob = document.getElementById('dob').value;
    const pancard = document.getElementById('pancard').value;
    const mobile = document.getElementById('mobile').value;
    const country = document.getElementById('country').value;
    const address = document.getElementById('address').value;

    if (password !== confirmPassword) {
        document.getElementById('message').textContent = "Passwords do not match!";
        return;
    }

    const userData = {
        name,
        username,
        email,
        password,
        role,
        dob,
        pancard,
        mobile,
        country,
        address
    };

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Registration failed!");
        }

        const result = await response.json();
        document.getElementById('message').textContent = result.message || "Registration successful!";
        document.getElementById('registrationForm').reset(); // Reset the form

    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
}

// Initialize function to set up event listeners
export function initialize(route) {
    if (route === '/register') {
        const loginForm = document.getElementById('registrationForm');
        loginForm.addEventListener('submit', (event) => {
            register(event)
        });
    }
}
