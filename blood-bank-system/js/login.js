import { loginAdmin } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // If already logged in, redirect to admin
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        window.location.href = 'admin.html';
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (loginAdmin(user, pass)) {
            window.location.href = 'admin.html';
        } else {
            loginError.classList.remove('d-none');
            document.getElementById('password').value = ''; // clear password field
        }
    });
});
