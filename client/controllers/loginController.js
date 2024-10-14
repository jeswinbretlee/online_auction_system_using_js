
const API_URL = '/api/auth'; // Replace with your API URL

// Login function
function login(role, username, password) {
    fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, username, password }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Login failed. Please check your username and password.');
            }
            return response.json();
        })
        .then((data) => {
            const token = data.token; // Store token
            localStorage.setItem('token', token);
            if(data.role == "admin"){

                navigateTo('/dashboard'); // Navigate to the dashboard upon successful login
            }
            else{
                navigateTo('/cart');
            }
        })
        .catch((error) => {
            document.getElementById('message').innerText = error.message; // Display error
        });
}

// Initialize function to set up event listeners
export function initialize(route) {
    if (route === '/login' || route ==='/') {
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            const role = document.getElementById('role').value; // Get the selected role
            const username = document.getElementById('loginUsername').value; // Get username
            const password = document.getElementById('loginPassword').value; // Get password

            login(role, username, password); // Call the login function
        });
    }
}
