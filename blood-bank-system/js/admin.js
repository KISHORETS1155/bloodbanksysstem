import { getDashboardStats, getDonors, getRequests, isAdminLoggedIn } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!isAdminLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Render Top Cards
    const stats = getDashboardStats();
    document.getElementById('dashDonors').textContent = stats.totalDonors;
    document.getElementById('dashRequests').textContent = stats.totalRequests;
    document.getElementById('dashUnits').textContent = stats.totalBloodUnits;
    document.getElementById('dashBanks').textContent = stats.totalBloodBanks;

    // Render Recent Requests (latest 5)
    // sort by latest id
    const requests = getRequests();
    const sortedRequests = requests.sort((a, b) => b.id - a.id).slice(0, 5);
    const reqBody = document.getElementById('dashRequestsTable');

    sortedRequests.forEach(req => {
        let badgeColor = 'bg-secondary';
        if (req.emergencyLevel === 'Urgent') badgeColor = 'bg-warning text-dark';
        if (req.emergencyLevel === 'Critical') badgeColor = 'bg-danger';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${req.patientName || 'N/A'}</td>
            <td><span class="badge bg-danger fs-6">${req.bloodGroup}</span></td>
            <td>${req.units}</td>
            <td><span class="badge ${badgeColor}">${req.emergencyLevel}</span></td>
            <td><small class="text-muted">${req.date}</small></td>
        `;
        reqBody.appendChild(tr);
    });

    if (sortedRequests.length === 0) {
        reqBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted p-3">No requests found.</td></tr>';
    }

    // Render Recent Donors (latest 5)
    const donors = getDonors();
    const sortedDonors = donors.sort((a, b) => b.id - a.id).slice(0, 5);
    const donorBody = document.getElementById('dashDonorsTable');

    sortedDonors.forEach(donor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${donor.name}</td>
            <td><span class="badge bg-danger">${donor.bloodGroup}</span></td>
            <td>${donor.city}</td>
            <td>${donor.phone}</td>
        `;
        donorBody.appendChild(tr);
    });

    if (sortedDonors.length === 0) {
        donorBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted p-3">No donors found.</td></tr>';
    }
});
