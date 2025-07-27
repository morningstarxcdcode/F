// Authentication State Management
const AUTH_STATE = {
    LOGGED_OUT: 'logged_out',
    REGISTERED: 'just_registered',
    LOGGED_IN: 'logged_in'
};

// Utility functions for validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}

// User Registration
function registerUser(email, password, userData = {}) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(user => user.email === email)) {
        throw new Error('Email already registered. Please login.');
    }
    
    // Store user with additional data
    const newUser = {
        email,
        password,
        ...userData,
        registeredAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set auth state as just registered
    setAuthState(AUTH_STATE.REGISTERED);
    setCurrentUser(email);
    
    return newUser;
}

// User Login
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        throw new Error('Invalid credentials. Please try again.');
    }
    
    setAuthState(AUTH_STATE.LOGGED_IN);
    setCurrentUser(email);
    
    return user;
}

// Authentication Check
function checkAuthentication() {
    const authState = getAuthState();
    const currentUser = getCurrentUser();
    
    if (!authState || !currentUser) {
        redirectToLogin();
        return false;
    }
    
    return true;
}

// Auth State Management
function setAuthState(state) {
    localStorage.setItem('authState', state);
}

function getAuthState() {
    return localStorage.getItem('authState');
}

function setCurrentUser(email) {
    localStorage.setItem('currentUser', JSON.stringify({ 
        email,
        lastLoginAt: new Date().toISOString()
    }));
}

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authState');
    redirectToLogin();
}

// Navigation Functions
function redirectToDashboard() {
    // Use absolute path to avoid any directory issues
    window.location.replace('dashbord.html');
}

function redirectToLogin() {
    window.location.replace('login.html');
}

function redirectToThankYou() {
    window.location.replace('thankyou.html');
}

// Error Handling
function showError(formId, message) {
    const errorDiv = document.getElementById(`${formId}-error`);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        
        // Add shake animation to form
        const form = document.getElementById(formId);
        if (form) {
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 820);
        }
    }
}

function hideError(formId) {
    const errorDiv = document.getElementById(`${formId}-error`);
    if (errorDiv) {
        errorDiv.classList.add('hidden');
    }
}

// Form Validation
function validateForm(formData) {
    if (!formData.email || !isValidEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
    }
    
    if (!formData.password || !isValidPassword(formData.password)) {
        throw new Error('Password must be at least 6 characters long');
    }
    
    return true;
}
