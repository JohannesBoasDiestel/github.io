// API Base URL - automatically detects environment
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://voddev-backend.onrender.com/api'; // Update this after deployment

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', async () => {

    const nav = document.querySelector('header nav');

    // Check authentication status with server
    let isLoggedIn = false;
    let username = '';

    try {
        const response = await fetch(`${API_URL}/auth/status`, {
            credentials: 'include'
        });
        const data = await response.json();
        isLoggedIn = data.isLoggedIn;
        username = data.username || '';
    } catch (error) {
        console.error('Error checking auth status:', error);
    }

    // --- DYNAMIC HEADER ---
    // Update header based on login status
    if (nav) {
        if (isLoggedIn) {
            nav.innerHTML = `
                <a href="dashboard.html">Dashboard</a>
                <a href="upload.html">Upload</a>
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
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    credentials: 'include'
                });
                alert('You have been logged out.');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error);
                alert('Error logging out. Please try again.');
            }
        });
    }

    // --- SIGN UP PAGE LOGIC ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Account for ${username} created successfully! Please log in.`);
                    window.location.href = 'login.html';
                } else {
                    alert(data.error || 'Error creating account');
                }
            } catch (error) {
                console.error('Signup error:', error);
                alert('Error creating account. Please make sure the server is running.');
            }
        });
    }

    // --- LOGIN PAGE LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Login successful! Redirecting to your dashboard.');
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.error || 'Invalid credentials');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Error logging in. Please make sure the server is running.');
            }
        });
    }

    // --- DASHBOARD PAGE GUARD ---
    const dashboardContent = document.getElementById('dashboard-content');
    if (dashboardContent && !isLoggedIn) {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html';
    }

    // --- LOAD FBX FILES ---
    const fbxList = document.getElementById('fbx-list');
    if (fbxList && isLoggedIn) {
        try {
            const response = await fetch(`${API_URL}/fbx`, {
                credentials: 'include'
            });
            const data = await response.json();

            if (data.files && data.files.length > 0) {
                fbxList.innerHTML = data.files.map(file => `
                    <a href="${file.url}" download class="pdf-item">
                        <div class="icon"><i class="fas fa-cube"></i></div>
                        <div class="pdf-info">
                            <h3>${file.name}</h3>
                            <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </a>
                `).join('');
            } else {
                fbxList.innerHTML = '<p style="color: var(--text-muted);">No FBX files available yet.</p>';
            }
        } catch (error) {
            console.error('Error loading FBX files:', error);
            fbxList.innerHTML = '<p style="color: var(--text-muted);">Error loading files.</p>';
        }
    }

    // --- LOAD EXE FILES ---
    const exeList = document.getElementById('exe-list');
    if (exeList && isLoggedIn) {
        try {
            const response = await fetch(`${API_URL}/exe`, {
                credentials: 'include'
            });
            const data = await response.json();

            if (data.files && data.files.length > 0) {
                exeList.innerHTML = data.files.map(file => `
                    <a href="${file.url}" download class="pdf-item">
                        <div class="icon"><i class="fas fa-download"></i></div>
                        <div class="pdf-info">
                            <h3>${file.name}</h3>
                            <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </a>
                `).join('');
            } else {
                exeList.innerHTML = '<p style="color: var(--text-muted);">No game downloads available yet.</p>';
            }
        } catch (error) {
            console.error('Error loading EXE files:', error);
            exeList.innerHTML = '<p style="color: var(--text-muted);">Error loading files.</p>';
        }
    }
});