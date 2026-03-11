import { saveRequest } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('requestForm');
    const alertBox = document.getElementById('requestAlert');

    requestForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const contact = document.getElementById('reqContact').value;
        const units = parseInt(document.getElementById('reqUnits').value, 10);

        if (!/^\d{10}$/.test(contact)) {
            alert("Contact number must be exactly 10 digits.");
            return;
        }

        if (units < 1) {
            alert("Units required must be at least 1.");
            return;
        }

        const requestData = {
            patientName: document.getElementById('reqName').value,
            bloodGroup: document.getElementById('reqBloodGroup').value,
            units: units,
            hospital: document.getElementById('reqHospital').value,
            city: document.getElementById('reqCity').value,
            contact: contact,
            emergencyLevel: document.getElementById('reqEmergency').value
        };

        saveRequest(requestData);

        alertBox.classList.remove('d-none');
        requestForm.reset();

        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 4000);
    });
});
