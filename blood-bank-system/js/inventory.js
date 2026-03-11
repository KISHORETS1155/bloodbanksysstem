import { addInventoryItem, updateInventoryItem, deleteInventoryItem, getInventory, isAdminLoggedIn } from './database.js';

let editModalInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    if (!isAdminLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    editModalInstance = new bootstrap.Modal(document.getElementById('editModal'));

    renderTable();

    const form = document.getElementById('inventoryForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const item = {
            bank: document.getElementById('invBank').value,
            city: document.getElementById('invCity').value,
            bloodGroup: document.getElementById('invGroup').value,
            units: parseInt(document.getElementById('invUnits').value, 10),
            contact: document.getElementById('invContact').value
        };

        addInventoryItem(item);
        form.reset();
        renderTable();
    });

    document.getElementById('saveUpdateBtn').addEventListener('click', () => {
        const id = document.getElementById('editItemId').value;
        const newUnits = document.getElementById('editUnits').value;

        if (newUnits === '' || parseInt(newUnits, 10) < 0) {
            alert('Please enter a valid unit number.');
            return;
        }

        updateInventoryItem(id, newUnits);
        editModalInstance.hide();
        renderTable();
    });
});

function renderTable() {
    const inventory = getInventory();
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    inventory.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${item.bank}</td>
            <td>${item.city}</td>
            <td><span class="badge bg-danger">${item.bloodGroup}</span></td>
            <td><span class="badge ${item.units == 0 ? 'bg-secondary' : 'bg-success'}">${item.units}</span></td>
            <td>${item.contact}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 my-1" onclick="window.openEditModal(${item.id}, ${item.units})" title="Update Units">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger my-1" onclick="window.deleteItem(${item.id})" title="Delete Record">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Attach to window globally for inline onclick handlers
window.openEditModal = function (id, currentUnits) {
    document.getElementById('editItemId').value = id;
    document.getElementById('editUnits').value = currentUnits;
    editModalInstance.show();
};

window.deleteItem = function (id) {
    if (confirm('Are you sure you want to delete this inventory item?')) {
        deleteInventoryItem(id);
        renderTable();
    }
};
