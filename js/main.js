// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    const nav = document.querySelector('header nav');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // --- DYNAMIC HEADER ---
    // Update header based on login status
    if (nav) {
        if (isLoggedIn) {
            nav.innerHTML = `
                <a href="dashboard.html">Dashboard</a>
                <a href="#" id="logout-btn" class="btn-nav-signup">Log Out</a>
            `;
        } else {
            nav.innerHTML = `
                <a href="login.html">Log In</a>
                <a href="signup.html" class="btn-nav-signup">Sign Up</a>
            `;
        }
    }

    // --- LOGOUT LOGIC ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            alert('You have been logged out.');
            window.location.href = 'index.html';
        });
    }

    // --- SIGN UP PAGE LOGIC ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission
            const username = document.getElementById('username').value;
            // In a real app, you would send this data to a server.
            // Here, we'll just simulate success.
            if (username) {
                alert(`Account for ${username} created successfully! Please log in.`);
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                alert('Please fill out all fields.');
            }
        });
    }

    // --- LOGIN PAGE LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // SIMULATION: Any username/password is accepted.
            const username = document.getElementById('username').value;
            if (username) {
                localStorage.setItem('isLoggedIn', 'true'); // Set login flag
                alert('Login successful! Redirecting to your dashboard.');
                window.location.href = 'dashboard.html'; // Redirect to protected page
            } else {
                alert('Please enter a username.');
            }
        });
    }

    // --- DASHBOARD PAGE GUARD ---
    // Protect the dashboard page from non-logged-in users
    const dashboardContent = document.getElementById('dashboard-content');
    if (dashboardContent && !isLoggedIn) {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html'; // Redirect to login
    }
});