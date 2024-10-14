let token = localStorage.getItem('token'); // Retrieve token from local storage

const routes = {
    '': 'pages/login.html',
    '/': 'pages/login.html',
    '/login': 'pages/login.html',
    '/register': 'pages/register.html',
    '/dashboard': 'pages/dashboard.html',
};

// Function to navigate to a specific route
function navigateTo(route) {
    window.history.pushState({}, route, window.location.origin + route);
    loadPage(route);
}

// Function to load the appropriate HTML page based on the route
function loadPage(route) {
    const page = routes[route] || 'pages/login.html'; // Default to login page

    fetch(page)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then((html) => {
            const app = document.getElementById('app');
            app.innerHTML = html;
            initializePage(route); // Call to initialize scripts for the loaded page
        })
        .catch((error) => {
            console.error('Error loading page:', error);
        });
}

// Function to initialize the page after loading
function initializePage(route) {
    token = localStorage.getItem('token'); 
    if (route === '/dashboard' && !token) {
        navigateTo('/login'); // Redirect to login if not authenticated
    }

    // Attach event listeners for forms dynamically
    const controllerName = getControllerName(route);
    if (controllerName) {
        import(`../controllers/${controllerName}.js`)
            .then((module) => {
                if (module.initialize) {
                    module.initialize(route); // Call the initialize function from the loaded module
                }
            })
            .catch((error) => {
                console.error('Error loading controller:', error);
            });
    }
}

// Function to derive the controller name from the route
function getControllerName(route) {
    switch (route) {
        case '/':
            return 'loginController';
        case '/login':
            return 'loginController';
        case '/register':
            return 'registerController';
        case '/dashboard':
            return 'dashboardController';
        case '/dashboardAdmin':
            return 'dashboardAdminController';
        case '/cart':
            return 'cartController';
        case '/sellercart':
            return 'seller_cartController';
        default:
            return null; // No controller needed
    }
}

// Handle back/forward navigation
window.onpopstate = () => {
    loadPage(window.location.pathname);
};

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadPage(window.location.pathname);
});

// Global logout function
function logout() {
    token = null; // Clear token
    localStorage.removeItem('token'); // Remove token from local storage
    navigateTo('/login'); // Redirect to login page
}
