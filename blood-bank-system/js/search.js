import { getInventory } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');

    // Automatically populate cities from inventory securely
    const inventory = getInventory();
    const cities = new Set(inventory.map(item => item.city));
    const citySelect = document.getElementById('searchCity');

    cities.forEach(city => {
        // Only append if it's not already there
        if (!Array.from(citySelect.options).some(opt => opt.value === city)) {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        }
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const bloodGroup = document.getElementById('searchBloodGroup').value;
        const city = document.getElementById('searchCity').value;

        searchBlood(bloodGroup, city);
    });
});

function searchBlood(bloodGroup, city) {
    const inventory = getInventory();

    const results = inventory.filter(item => {
        const matchGroup = item.bloodGroup === bloodGroup;
        const matchCity = city === 'Any' || item.city.toLowerCase() === city.toLowerCase();
        return matchGroup && matchCity && parseInt(item.units, 10) > 0;
    });

    renderResults(results);
}

function renderResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const tbody = document.getElementById('resultsBody');

    tbody.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.classList.add('d-none');
        noResults.classList.remove('d-none');
    } else {
        noResults.classList.add('d-none');
        resultsContainer.classList.remove('d-none');

        results.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="fw-bold">${item.bank}</td>
                <td>${item.city}</td>
                <td><span class="badge bg-danger fs-6">${item.bloodGroup}</span></td>
                <td><span class="badge bg-secondary fs-6">${item.units} Units</span></td>
                <td><a href="tel:${item.contact}" class="btn btn-sm btn-outline-dark"><i class="bi bi-telephone-fill text-success"></i> ${item.contact}</a></td>
            `;
            tbody.appendChild(tr);
        });
    }
}
