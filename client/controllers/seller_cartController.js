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
    if (route === '/sellercart') {
        document.getElementById('add-listing-form').addEventListener('submit', addListing);
        // getUserDetails(); // Fetch user details on dashboard load
        fetchSellerListings();
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

async function fetchSellerListings() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Validate the token
    if (!token) {
        redirectToLogin();
        return; // Exit the function if the token is invalid
    }

    try {
        const response = await fetch(`${API_URL}/getProduct`, {
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

        const listings = await response.json();
        const listingsList = document.getElementById('seller-listings');
        listingsList.innerHTML = ''; // Clear current listings

        listings.forEach(listing => {
            const listItem = document.createElement('li');
            listItem.textContent = `${listing.title} - $${listing.startingPrice}`;
            listingsList.appendChild(listItem);
        });

    } catch (error) {
        console.error(error.message); // Log error message
    }
}
async function addListing(event) {
    event.preventDefault(); // Prevent form submission

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startingPrice = document.getElementById('startingPrice').value;
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Validate the token
    if (!token) {
        redirectToLogin();
        return; // Exit the function if the token is invalid
    }

    try {
        const response = await fetch(`${API_URL}/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include the token in the Authorization header
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, startingPrice })
        });

        if (!response.ok) {
            alert('Failed to add listing');
            throw new Error("Failed to fetch user details!"); // Improved error message
        }
        alert('Listing added successfully');
        document.getElementById('add-listing-form').reset();
        fetchSellerListings(); // Refresh the listings


    } catch (error) {
        console.error(error.message); // Log error message
    }
}




