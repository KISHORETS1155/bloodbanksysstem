// js/database.js

const DB_KEYS = {
    DONORS: 'donors',
    REQUESTS: 'requests',
    INVENTORY: 'inventory'
};

const INITIAL_INVENTORY = [
    { id: 1, bank: "Apollo Hospital", city: "Chennai", bloodGroup: "O+", units: 10, contact: "9876543210" },
    { id: 2, bank: "Government Hospital", city: "Chennai", bloodGroup: "A+", units: 6, contact: "9876543211" },
    { id: 3, bank: "City Blood Bank", city: "Madurai", bloodGroup: "B+", units: 4, contact: "9876543212" },
    { id: 4, bank: "Red Cross", city: "Coimbatore", bloodGroup: "AB+", units: 3, contact: "9876543213" }
];

export function initializeDatabase() {
    if (!localStorage.getItem(DB_KEYS.INVENTORY)) {
        localStorage.setItem(DB_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
    }
    if (!localStorage.getItem(DB_KEYS.DONORS)) {
        localStorage.setItem(DB_KEYS.DONORS, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.REQUESTS)) {
        localStorage.setItem(DB_KEYS.REQUESTS, JSON.stringify([]));
    }
}

function getData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error parsing JSON from LocalStorage", e);
        return [];
    }
}

function saveDataInfo(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Donors
export function getDonors() {
    return getData(DB_KEYS.DONORS);
}

export function saveDonor(donor) {
    const donors = getDonors();
    donor.id = Date.now();
    donors.push(donor);
    saveDataInfo(DB_KEYS.DONORS, donors);
}

// Requests
export function getRequests() {
    return getData(DB_KEYS.REQUESTS);
}

export function saveRequest(request) {
    const requests = getRequests();
    request.id = Date.now();
    request.status = 'Pending';
    request.date = new Date().toISOString().split('T')[0];
    requests.push(request);
    saveDataInfo(DB_KEYS.REQUESTS, requests);
}

// Inventory
export function getInventory() {
    return getData(DB_KEYS.INVENTORY);
}

export function addInventoryItem(item) {
    const inventory = getInventory();
    item.id = Date.now();
    inventory.push(item);
    saveDataInfo(DB_KEYS.INVENTORY, inventory);
}

export function updateInventoryItem(id, units) {
    const inventory = getInventory();
    const item = inventory.find(i => i.id == id);
    if (item) {
        item.units = parseInt(units, 10);
        saveDataInfo(DB_KEYS.INVENTORY, inventory);
    }
}

export function deleteInventoryItem(id) {
    const inventory = getInventory();
    const newInventory = inventory.filter(i => i.id != id);
    saveDataInfo(DB_KEYS.INVENTORY, newInventory);
}

// Admin Authentication
export function loginAdmin(username, password) {
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        return true;
    }
    return false;
}

export function logoutAdmin() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

export function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Dashboard Stats
export function getDashboardStats() {
    const donors = getDonors();
    const requests = getRequests();
    const inventory = getInventory();

    const totalDonors = donors.length;
    const totalRequests = requests.length;
    const totalBloodUnits = inventory.reduce((sum, item) => sum + parseInt(item.units, 10), 0);

    // Unique blood banks
    const bankSet = new Set(inventory.map(i => i.bank));
    const totalBloodBanks = bankSet.size;

    return { totalDonors, totalRequests, totalBloodUnits, totalBloodBanks };
}
