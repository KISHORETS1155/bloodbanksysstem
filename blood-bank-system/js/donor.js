import { saveDonor } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    const donorForm = document.getElementById('donorForm');
    const alertBox = document.getElementById('donorAlert');

    donorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const age = parseInt(document.getElementById('donorAge').value, 10);
        const phone = document.getElementById('donorPhone').value;
        const bloodGroup = document.getElementById('donorBloodGroup').value;

        // Strict Validation Checks
        if (age < 18) {
            alert("Age must be 18 or older to donate blood.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        if (!bloodGroup) {
            alert("Please select a blood group.");
            return;
        }

        const donorData = {
            name: document.getElementById('donorName').value,
            age: age,
            gender: document.getElementById('donorGender').value,
            bloodGroup: bloodGroup,
            phone: phone,
            city: document.getElementById('donorCity').value,
            lastDonationDate: document.getElementById('donorLastDate').value || 'Never',
            registrationDate: new Date().toISOString().split('T')[0]
        };

        saveDonor(donorData);

        // Show success alert
        alertBox.classList.remove('d-none');
        donorForm.reset();

        // Hide alert after 4 seconds
        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 4000);
    });
});
