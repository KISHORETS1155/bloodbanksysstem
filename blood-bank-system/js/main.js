import { initializeDatabase, isAdminLoggedIn, logoutAdmin } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize database default data on page load
    initializeDatabase();

    // Dynamic Navbar Management for Admin
    const navLinksList = document.querySelector('#navbarNav ul');
    if (navLinksList) {
        if (isAdminLoggedIn()) {
            // Check if Logout button already exists
            if (!document.getElementById('logoutBtn')) {
                const li = document.createElement('li');
                li.className = 'nav-item ms-lg-3';
                li.innerHTML = `<button id="logoutBtn" class="btn btn-outline-light btn-sm mt-1 fw-bold"><i class="bi bi-box-arrow-right"></i> Logout Admin</button>`;
                navLinksList.appendChild(li);

                document.getElementById('logoutBtn').addEventListener('click', (e) => {
                    e.preventDefault();
                    logoutAdmin();
                });
            }
        } else {
            // Hide Admin Dashboard and Inventory links for normal users
            const adminLinks = document.querySelectorAll('a[href="admin.html"], a[href="inventory.html"]');
            adminLinks.forEach(link => {
                if (link.parentElement && link.parentElement.tagName === 'LI') {
                    link.parentElement.style.display = 'none';
                } else {
                    link.style.display = 'none';
                }
            });

            // Allow login specific direct page additions 
            if (!document.getElementById('loginNavBtn')) {
                const li = document.createElement('li');
                li.className = 'nav-item ms-lg-3';
                li.innerHTML = `<a id="loginNavBtn" class="btn btn-outline-light btn-sm mt-1 fw-bold" href="login.html"><i class="bi bi-shield-lock"></i> Admin Login</a>`;
                navLinksList.appendChild(li);
            }
        }
    }
});
