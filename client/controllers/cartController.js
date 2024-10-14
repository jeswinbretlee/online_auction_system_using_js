const API_URL = '/api/home'; // Replace with your API URL

function redirectToLogin() {
    window.location.href = '/login'; // Adjust the path to your login page
}

// getUserDetails function
async function getUserDetails() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Validate the token
    if (!token) {
        redirectToLogin();
        return; // Exit the function if the token is invalid
    }

    try {
        const response = await fetch(`${API_URL}/getUserDetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include the token in the Authorization header
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            redirectToLogin();
            throw new Error("Failed to fetch user details!"); // Improved error message
        }

        const result = await response.json();
        displayUserDetails(result);
        console.log(result); // You can log or display user details here

    } catch (error) {
        console.error(error.message); // Log error message
    }
}

function logout() {
    localStorage.removeItem('token');
    redirectToLogin(); // Adjust the path to your login page
}

// Initialize function to set up event listeners
export function initialize(route) {
    if (route === '/cart') {
       // getUserDetails(); // Fetch user details on dashboard load

        // const logoutButton = document.getElementById('logoutButton');
        // if (logoutButton) {
        //     logoutButton.addEventListener('click', (event) => { 
        //         event.preventDefault(); 
        //         logout(); 
        //     });
        // } else {
        //     console.error("Logout button not found"); // Log if the button isn't found
        // }
    }
}


// Example: Call the initialize function with the current route
//initialize('/dashboard'); // Ensure this is called when the route changes to /dashboard
// Add a listing to the cart
async function addToCart(listingId) {
    const token = localStorage.getItem('token');

    // Validate the token
    if (!token) {
        redirectToLogin();
        return; // Exit the function if the token is invalid
    }

    try {
        const response = await fetch(`${API_URL}/addCart/${listingId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include the token in the Authorization header
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            redirectToLogin();
            throw new Error("Failed to fetch user details!"); // Improved error message
        }

        const result = await response.json();
        displayUserDetails(result);
        console.log(result); // You can log or display user details here

    } catch (error) {
        console.error(error.message); // Log error message
    }
}
async function viewCart() {
    const token = localStorage.getItem('token');

    // Validate the token
    if (!token) {
        redirectToLogin();
        return; // Exit the function if the token is invalid
    }

    try {
        const response = await fetch(`${API_URL}/getCart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include the token in the Authorization header
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            redirectToLogin();
            throw new Error("Failed to fetch user details!"); // Improved error message
        }

        const result = await response.json();
        displayUserDetails(result);
        console.log(result); // You can log or display user details here

    } catch (error) {
        console.error(error.message); // Log error message
    }
}


async function deleteCart(listingId) {
    const token = localStorage.getItem('token');

    // Validate the token
    if (!token) {
        redirectToLogin();
        return; // Exit the function if the token is invalid
    }

    try {
        const response = await fetch(`${API_URL}/deleteCart/${listingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include the token in the Authorization header
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            redirectToLogin();
            throw new Error("Failed to fetch user details!"); // Improved error message
        }

        const result = await response.json();
        displayUserDetails(result);
        console.log(result); // You can log or display user details here

    } catch (error) {
        console.error(error.message); // Log error message
    }
}

