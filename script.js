// CivicTrack - Complete Frontend JavaScript

// Sample data for demonstration
const sampleIssues = [
    {
        id: 1,
        title: "Pothole on Main Street",
        category: "Roads & Transportation",
        description: "Large pothole causing traffic issues near the intersection. The hole is approximately 3 feet wide and 8 inches deep.",
        location: "123 Main Street, Springfield",
        status: "Reported",
        priority: "High",
        reporter: "Sarah Johnson",
        date: "2024-08-02",
        flags: 0,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center",
        contact: {
            name: "Sarah Johnson",
            email: "sarah.johnson@example.com",
            phone: "555-123-4567"
        }
    },
    {
        id: 2,
        title: "Broken Water Main",
        category: "Water & Drainage",
        description: "Water flooding the sidewalk on Oak Avenue, creating hazardous conditions for pedestrians.",
        location: "456 Oak Avenue, Springfield",
        status: "In Progress",
        priority: "Urgent",
        reporter: "Anonymous",
        date: "2024-08-03",
        flags: 3,
        image: "https://images.unsplash.com/photo-1551888969-6d2d6e1870dc?w=800&h=400&fit=crop&crop=center"
    },
    {
        id: 3,
        title: "Overflowing Trash Bins",
        category: "Cleanliness & Waste",
        description: "Multiple trash bins overflowing in Central Park, attracting pests and creating unsanitary conditions.",
        location: "Central Park, Springfield",
        status: "Reported",
        priority: "Medium",
        reporter: "Mike Chen",
        date: "2024-08-01",
        flags: 1,
        image: "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?w=800&h=400&fit=crop&crop=center"
    },
    {
        id: 4,
        title: "Broken Street Light",
        category: "Street Lighting",
        description: "Street light not working on Elm Street, creating safety concern for pedestrians at night.",
        location: "789 Elm Street, Springfield",
        status: "Resolved",
        priority: "High",
        reporter: "Lisa Rodriguez",
        date: "2024-07-30",
        flags: 0,
        image: "https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=800&h=400&fit=crop&crop=center"
    },
    {
        id: 5,
        title: "Damaged Park Bench",
        category: "Parks & Recreation",
        description: "Wooden bench broken and unsafe to use, with splinters and loose planks.",
        location: "Riverside Park, Springfield",
        status: "In Progress",
        priority: "Low",
        reporter: "John Smith",
        date: "2024-08-01",
        flags: 0,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center"
    },
    {
        id: 6,
        title: "Graffiti on Building Wall",
        category: "Cleanliness & Waste",
        description: "Vandalism on the side of the community center, affecting the neighborhood's appearance.",
        location: "Community Center, Springfield",
        status: "Under Review",
        priority: "Medium",
        reporter: "Emma Wilson",
        date: "2024-08-02",
        flags: 0,
        image: "https://images.unsplash.com/photo-1516617442442-4007d31a36bb?w=800&h=400&fit=crop&crop=center"
    },
    {
        id: 7,
        title: "Broken Playground Equipment",
        category: "Parks & Recreation",
        description: "Swing set chain broken, making it unsafe for children to use.",
        location: "Sunset Elementary Playground, Springfield",
        status: "Reported",
        priority: "High",
        reporter: "Parent Committee",
        date: "2024-08-03",
        flags: 2,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&crop=center"
    },
    {
        id: 8,
        title: "Pothole on Bridge Road",
        category: "Roads & Transportation",
        description: "Deep pothole on the main bridge causing vehicle damage and traffic delays.",
        location: "Bridge Road, Springfield",
        status: "In Progress",
        priority: "Urgent",
        reporter: "Traffic Department",
        date: "2024-08-04",
        flags: 5,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop&crop=center"
    }
];

// Global variables
let currentUser = {
    username: 'Guest',
    role: 'User',
    isAdmin: false
};

let filteredIssues = [...sampleIssues];
let currentIssue = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadPageContent();
});

function initializeApp() {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('civictrack_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserDisplay();
    }

    // Initialize tooltips and other components
    initializeTooltips();
    setupAnimations();
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Report form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmission);
        setupReportForm();
    }

    // Filter form
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.addEventListener('submit', handleFilterSubmission);
    }

    // Admin bulk actions
    const bulkForm = document.getElementById('bulkForm');
    if (bulkForm) {
        bulkForm.addEventListener('submit', handleBulkActions);
        setupAdminControls();
    }

    // Status update modal
    const statusForm = document.getElementById('statusForm');
    if (statusForm) {
        statusForm.addEventListener('submit', handleStatusUpdate);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    const adminSearchInput = document.getElementById('adminSearchInput');
    if (adminSearchInput) {
        adminSearchInput.addEventListener('input', handleAdminSearch);
    }

    // View toggle buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });

    // File upload preview
    const fileUpload = document.getElementById('file_upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', handleFileUpload);
    }

    // Anonymous checkbox
    const anonymousCheckbox = document.getElementById('anonymous');
    if (anonymousCheckbox) {
        anonymousCheckbox.addEventListener('change', toggleContactInfo);
    }

    // Admin status form
    const adminUpdateForm = document.getElementById('adminUpdateForm');
    if (adminUpdateForm) {
        adminUpdateForm.addEventListener('submit', handleAdminStatusUpdate);
    }
}

function loadPageContent() {
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
        case 'home':
            loadHomePage();
            break;
        case 'admin_dashboard':
            loadAdminDashboard();
            break;
        case 'issue_detail':
            loadIssueDetail();
            break;
        case 'report':
            // Report page is mostly static, no dynamic loading needed
            break;
        default:
            // Index/login page
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '');
}

// Login functionality
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const role = formData.get('role');
    
    if (!username || !role) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Simulate login
    currentUser = {
        username: username,
        role: role,
        isAdmin: role.includes('Admin')
    };
    
    // Save to localStorage
    localStorage.setItem('civictrack_user', JSON.stringify(currentUser));
    
    // Redirect based on role
    if (currentUser.isAdmin) {
        window.location.href = 'admin_dashboard.html';
    } else {
        window.location.href = 'home.html';
    }
}

// Home page functionality
function loadHomePage() {
    loadIssues();
    initializeMap();
    updateUserDisplay();
}

function loadIssues() {
    const container = document.getElementById('issues-container');
    const issueCount = document.getElementById('issueCount');
    const noIssues = document.getElementById('no-issues');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredIssues.length === 0) {
        noIssues.style.display = 'block';
        container.style.display = 'none';
        if (issueCount) issueCount.textContent = '0';
        return;
    }
    
    noIssues.style.display = 'none';
    container.style.display = 'flex';
    if (issueCount) issueCount.textContent = filteredIssues.length;
    
    filteredIssues.forEach(issue => {
        const issueCard = createIssueCard(issue);
        container.appendChild(issueCard);
    });
}

function createIssueCard(issue) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-xl-4 mb-4';
    
    const statusBadgeClass = getStatusBadgeClass(issue.status);
    const priorityBadgeClass = getPriorityBadgeClass(issue.priority);
    
    col.innerHTML = `
        <div class="card h-100 issue-card shadow-sm card-3d" onclick="viewIssueDetail(${issue.id})">
            <img src="${issue.image}" class="card-img-top" alt="${issue.title}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${issue.title}</h5>
                <p class="card-text text-muted small mb-2">
                    <i class="fas fa-tag"></i> ${issue.category}
                </p>
                <p class="card-text">${issue.description.length > 100 ? issue.description.substring(0, 100) + '...' : issue.description}</p>
                <p class="card-text small text-muted">
                    <i class="fas fa-map-marker-alt"></i> ${issue.location}
                </p>
                
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge ${statusBadgeClass}">
                        ${issue.status}
                    </span>
                    <span class="badge ${priorityBadgeClass}">
                        ${issue.priority}
                    </span>
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">By ${issue.reporter}</small>
                    <small class="text-muted">${formatDate(issue.date)}</small>
                </div>
            </div>
            
            <div class="card-footer bg-transparent">
                <button class="btn btn-primary btn-sm w-100" onclick="event.stopPropagation(); viewIssueDetail(${issue.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>
            </div>
        </div>
    `;
    
    return col;
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Resolved': return 'bg-success';
        case 'In Progress': return 'bg-warning';
        case 'Under Review': return 'bg-info';
        case 'Urgent': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

function getPriorityBadgeClass(priority) {
    switch (priority) {
        case 'Urgent': return 'bg-danger';
        case 'High': return 'bg-warning';
        case 'Medium': return 'bg-info';
        default: return 'bg-secondary';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Map functionality
function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || typeof L === 'undefined') return;
    
    // Initialize map centered on Springfield, IL
    const map = L.map('map').setView([39.7817, -89.6501], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers for issues
    filteredIssues.forEach(issue => {
        // Generate random coordinates around Springfield for demo
        const lat = 39.7817 + (Math.random() - 0.5) * 0.1;
        const lng = -89.6501 + (Math.random() - 0.5) * 0.1;
        
        const markerColor = getMarkerColor(issue.status);
        const marker = L.marker([lat, lng]).addTo(map);
        
        marker.bindPopup(`
            <div class="popup-content">
                <h6>${issue.title}</h6>
                <p class="mb-1"><strong>Status:</strong> ${issue.status}</p>
                <p class="mb-1"><strong>Priority:</strong> ${issue.priority}</p>
                <button class="btn btn-sm btn-primary" onclick="viewIssueDetail(${issue.id})">
                    View Details
                </button>
            </div>
        `);
    });
}

function getMarkerColor(status) {
    switch (status) {
        case 'Resolved': return 'green';
        case 'In Progress': return 'orange';
        case 'Under Review': return 'blue';
        case 'Urgent': return 'red';
        default: return 'gray';
    }
}

// Filter functionality
function handleFilterSubmission(e) {
    e.preventDefault();
    applyFilters();
}

function applyFilters() {
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    filteredIssues = sampleIssues.filter(issue => {
        const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
        const matchesSearch = !searchQuery || 
            issue.title.toLowerCase().includes(searchQuery) ||
            issue.description.toLowerCase().includes(searchQuery) ||
            issue.location.toLowerCase().includes(searchQuery);
        
        return matchesStatus && matchesCategory && matchesSearch;
    });
    
    loadIssues();
    if (window.map) {
        initializeMap(); // Refresh map markers
    }
}

function handleSearch(e) {
    setTimeout(() => {
        applyFilters();
    }, 300); // Debounce search
}

// Report functionality
function setupReportForm() {
    // Initialize form components
    updateContactVisibility();
}

function handleReportSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const category = formData.get('category');
    const location = formData.get('location');
    
    // Validation
    const errors = [];
    if (!title) errors.push('Issue title is required');
    if (!category) errors.push('Category is required');
    if (!location) errors.push('Location is required');
    
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }
    
    // Create new issue
    const newIssue = {
        id: sampleIssues.length + 1,
        title: title,
        category: category,
        description: formData.get('description') || '',
        location: location,
        status: 'Reported',
        priority: formData.get('priority') || 'Medium',
        reporter: formData.get('anonymous') ? 'Anonymous' : (formData.get('contact_name') || currentUser.username),
        date: new Date().toISOString().split('T')[0],
        flags: 0,
        image: formData.get('image_url') || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop&crop=center'
    };
    
    // Add to issues array
    sampleIssues.unshift(newIssue);
    filteredIssues = [...sampleIssues];
    
    // Show success message
    showSuccessMessage(newIssue.id);
}

function showSuccessMessage(issueId) {
    const successDiv = document.getElementById('successMessage');
    const reportIdSpan = document.getElementById('reportId');
    const form = document.getElementById('reportForm');
    
    if (successDiv && reportIdSpan) {
        reportIdSpan.textContent = `#${String(issueId).padStart(3, '0')}`;
        successDiv.classList.remove('d-none');
        form.style.display = 'none';
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

function showErrors(errors) {
    const errorDiv = document.getElementById('errorMessage');
    const errorList = document.getElementById('errorList');
    
    if (errorDiv && errorList) {
        errorList.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
        errorDiv.classList.remove('d-none');
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleContactInfo() {
    const contactInfo = document.getElementById('contactInfo');
    const anonymous = document.getElementById('anonymous');
    
    if (contactInfo && anonymous) {
        if (anonymous.checked) {
            contactInfo.style.display = 'none';
        } else {
            contactInfo.style.display = 'block';
        }
    }
}

function updateContactVisibility() {
    toggleContactInfo();
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('imagePreviewContainer');
    
    if (file && preview && previewContainer) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.src = event.target.result;
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Geolocation functionality
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                showAlert(`Location detected: ${lat.toFixed(6)}, ${lng.toFixed(6)}`, 'success');
                
                // Update map if it exists
                if (window.map) {
                    window.map.setView([lat, lng], 15);
                    L.marker([lat, lng])
                        .addTo(window.map)
                        .bindPopup("Your current location")
                        .openPopup();
                }
            },
            function(error) {
                showAlert('Unable to retrieve your location. Please check your browser settings.', 'warning');
            }
        );
    } else {
        showAlert('Geolocation is not supported by this browser.', 'danger');
    }
}

function getCurrentLocationForForm() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                const locationInput = document.getElementById('location');
                if (locationInput) {
                    locationInput.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                }
                
                showAlert('Location added to form', 'success');
            },
            function(error) {
                showAlert('Unable to retrieve your location. Please enter it manually.', 'warning');
            }
        );
    } else {
        showAlert('Geolocation is not supported by this browser.', 'danger');
    }
}

// Admin dashboard functionality
function loadAdminDashboard() {
    updateAdminStats();
    loadAdminIssuesTable();
    updateUserDisplay();
    setupAdminControls();
}

function updateAdminStats() {
    const totalIssues = document.getElementById('totalIssues');
    const pendingIssues = document.getElementById('pendingIssues');
    const inProgressIssues = document.getElementById('inProgressIssues');
    const resolvedIssues = document.getElementById('resolvedIssues');
    
    if (totalIssues) totalIssues.textContent = sampleIssues.length;
    if (pendingIssues) pendingIssues.textContent = sampleIssues.filter(i => i.status === 'Reported').length;
    if (inProgressIssues) inProgressIssues.textContent = sampleIssues.filter(i => i.status === 'In Progress').length;
    if (resolvedIssues) resolvedIssues.textContent = sampleIssues.filter(i => i.status === 'Resolved').length;
}

function loadAdminIssuesTable() {
    const tableBody = document.getElementById('issuesTableBody');
    const noIssuesDiv = document.getElementById('no-admin-issues');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (filteredIssues.length === 0) {
        noIssuesDiv?.classList.remove('d-none');
        return;
    }
    
    noIssuesDiv?.classList.add('d-none');
    
    filteredIssues.forEach(issue => {
        const row = createAdminTableRow(issue);
        tableBody.appendChild(row);
    });
    
    setupTableControls();
}

function createAdminTableRow(issue) {
    const tr = document.createElement('tr');
    tr.setAttribute('data-issue-id', issue.id);
    
    const statusBadgeClass = getStatusBadgeClass(issue.status);
    const priorityBadgeClass = getPriorityBadgeClass(issue.priority);
    
    tr.innerHTML = `
        <td>
            <input type="checkbox" name="issue_ids" value="${issue.id}" class="form-check-input issue-checkbox">
        </td>
        <td>
            <a href="issue_detail.html?id=${issue.id}" class="text-decoration-none">
                #${String(issue.id).padStart(3, '0')}
            </a>
        </td>
        <td>
            <div class="issue-title">
                ${issue.title.length > 30 ? issue.title.substring(0, 30) + '...' : issue.title}
            </div>
            ${issue.image ? '<small class="text-muted"><i class="fas fa-image"></i> Has image</small>' : ''}
        </td>
        <td>
            <span class="badge bg-secondary">${issue.category}</span>
        </td>
        <td>
            <span class="badge ${statusBadgeClass}">${issue.status}</span>
        </td>
        <td>
            <span class="badge ${priorityBadgeClass}">${issue.priority}</span>
        </td>
        <td>${issue.reporter}</td>
        <td>
            <small>${formatDate(issue.date)}</small>
        </td>
        <td>
            ${issue.flags > 0 ? `<span class="badge bg-danger">${issue.flags}</span>` : '<span class="text-muted">0</span>'}
        </td>
        <td>
            <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-outline-primary" onclick="quickStatusUpdate(${issue.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="btn btn-outline-warning" onclick="flagIssue(${issue.id})">
                    <i class="fas fa-flag"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="deleteIssue(${issue.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return tr;
}

function setupAdminControls() {
    // Setup select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.issue-checkbox');
            checkboxes.forEach(cb => cb.checked = this.checked);
            updateBulkButton();
        });
    }
    
    // Setup bulk action dropdown
    const bulkAction = document.getElementById('bulkAction');
    if (bulkAction) {
        bulkAction.addEventListener('change', updateBulkButton);
    }
    
    updateBulkButton();
}

function setupTableControls() {
    // Setup individual checkboxes
    document.querySelectorAll('.issue-checkbox').forEach(cb => {
        cb.addEventListener('change', updateBulkButton);
    });
}

function updateBulkButton() {
    const selected = document.querySelectorAll('.issue-checkbox:checked').length;
    const bulkSubmit = document.getElementById('bulkSubmit');
    const bulkAction = document.getElementById('bulkAction');
    
    if (bulkSubmit && bulkAction) {
        bulkSubmit.disabled = selected === 0 || bulkAction.value === '';
        
        if (selected > 0) {
            bulkSubmit.textContent = `Apply to ${selected} Selected`;
        } else {
            bulkSubmit.textContent = 'Apply to Selected';
        }
    }
}

function handleBulkActions(e) {
    e.preventDefault();
    
    const selected = Array.from(document.querySelectorAll('.issue-checkbox:checked')).map(cb => parseInt(cb.value));
    const action = document.getElementById('bulkAction')?.value;
    
    if (selected.length === 0) {
        showAlert('No issues selected', 'warning');
        return;
    }
    
    if (!action) {
        showAlert('Please select an action', 'warning');
        return;
    }
    
    const actionText = document.getElementById('bulkAction')?.selectedOptions[0]?.text;
    if (!confirm(`Are you sure you want to ${actionText?.toLowerCase()} ${selected.length} issue(s)?`)) {
        return;
    }
    
    // Apply action to selected issues
    selected.forEach(issueId => {
        const issue = sampleIssues.find(i => i.id === issueId);
        if (issue) {
            switch (action) {
                case 'mark_in_progress':
                    issue.status = 'In Progress';
                    break;
                case 'mark_resolved':
                    issue.status = 'Resolved';
                    break;
                case 'delete':
                    const index = sampleIssues.findIndex(i => i.id === issueId);
                    if (index > -1) sampleIssues.splice(index, 1);
                    break;
            }
        }
    });
    
    // Refresh displays
    filteredIssues = [...sampleIssues];
    loadAdminIssuesTable();
    updateAdminStats();
    
    showAlert(`${actionText} applied to ${selected.length} issue(s)`, 'success');
}

function handleAdminSearch(e) {
    const query = e.target.value.toLowerCase();
    
    filteredIssues = sampleIssues.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.location.toLowerCase().includes(query) ||
        issue.reporter.toLowerCase().includes(query) ||
        issue.category.toLowerCase().includes(query)
    );
    
    loadAdminIssuesTable();
}

// Issue detail functionality
function loadIssueDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const issueId = parseInt(urlParams.get('id')) || 1;
    
    currentIssue = sampleIssues.find(issue => issue.id === issueId);
    if (!currentIssue) {
        currentIssue = sampleIssues[0]; // Fallback to first issue
    }
    
    populateIssueDetails(currentIssue);
    updateUserDisplay();
    
    // Show admin controls if user is admin
    if (currentUser.isAdmin) {
        const adminControls = document.getElementById('adminControls');
        if (adminControls) {
            adminControls.classList.remove('d-none');
        }
    }
}

function populateIssueDetails(issue) {
    // Update basic info
    updateElementText('issueId', `#${String(issue.id).padStart(3, '0')}`);
    updateElementText('issueTitle', issue.title);
    updateElementText('issueCategory', issue.category);
    updateElementText('issuePriority', issue.priority);
    updateElementText('issueReporter', issue.reporter);
    updateElementText('issueLocation', issue.location);
    updateElementText('issueDescription', issue.description);
    updateElementText('issueDate', formatDetailDate(issue.date));
    updateElementText('issueUpdated', formatDetailDate(issue.date));
    updateElementText('issueFlags', issue.flags);
    
    // Update status badge
    const statusElement = document.getElementById('issueStatus');
    if (statusElement) {
        statusElement.textContent = issue.status;
        statusElement.className = `badge ${getStatusBadgeClass(issue.status)} fs-6`;
    }
    
    // Update priority badge
    const priorityElement = document.getElementById('issuePriority');
    if (priorityElement) {
        priorityElement.className = `badge ${getPriorityBadgeClass(issue.priority)}`;
    }
    
    // Update image
    const imageElement = document.getElementById('issueImage');
    if (imageElement && issue.image) {
        imageElement.src = issue.image;
        imageElement.alt = issue.title;
    }
    
    // Update contact info if available
    if (issue.contact && !issue.reporter.includes('Anonymous')) {
        updateElementText('contactName', issue.contact.name);
        updateElementAttribute('contactEmail', 'href', `mailto:${issue.contact.email}`);
        updateElementText('contactEmail', issue.contact.email);
        updateElementAttribute('contactPhone', 'href', `tel:${issue.contact.phone}`);
        updateElementText('contactPhone', issue.contact.phone);
    } else {
        const contactCard = document.getElementById('contactCard');
        if (contactCard) contactCard.style.display = 'none';
    }
    
    // Update admin form if present
    const adminStatus = document.getElementById('adminStatus');
    if (adminStatus) {
        adminStatus.value = issue.status;
    }
}

function formatDetailDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

function updateElementAttribute(id, attribute, value) {
    const element = document.getElementById(id);
    if (element) element.setAttribute(attribute, value);
}

// Status update functionality
function quickStatusUpdate(issueId) {
    const issue = sampleIssues.find(i => i.id === issueId);
    if (!issue) return;
    
    const modalIssueId = document.getElementById('modalIssueId');
    const modalStatus = document.getElementById('modalStatus');
    
    if (modalIssueId) modalIssueId.value = issueId;
    if (modalStatus) modalStatus.value = issue.status;
    
    const modal = new bootstrap.Modal(document.getElementById('statusModal'));
    modal.show();
}

function handleStatusUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const issueId = parseInt(document.getElementById('modalIssueId')?.value);
    const newStatus = formData.get('status');
    const note = formData.get('note');
    
    const issue = sampleIssues.find(i => i.id === issueId);
    if (issue) {
        issue.status = newStatus;
        
        // Refresh current view
        if (getCurrentPage() === 'admin_dashboard') {
            loadAdminDashboard();
        } else if (getCurrentPage() === 'issue_detail') {
            populateIssueDetails(issue);
        }
        
        showAlert(`Issue #${String(issueId).padStart(3, '0')} status updated to ${newStatus}`, 'success');
    }
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('statusModal'));
    modal.hide();
}

function handleAdminStatusUpdate(e) {
    e.preventDefault();
    
    if (!currentIssue) return;
    
    const formData = new FormData(e.target);
    const newStatus = formData.get('status');
    const note = formData.get('note');
    
    currentIssue.status = newStatus;
    populateIssueDetails(currentIssue);
    
    showAlert(`Status updated to ${newStatus}`, 'success');
}

// Action functions
function viewIssueDetail(issueId) {
    window.location.href = `issue_detail.html?id=${issueId}`;
}

function flagIssue(issueId) {
    if (issueId) {
        const issue = sampleIssues.find(i => i.id === issueId);
        if (issue) {
            issue.flags = (issue.flags || 0) + 1;
            showAlert('Issue flagged for review', 'warning');
        }
    } else {
        showAlert('Issue flagged for review', 'warning');
    }
}

function deleteIssue(issueId) {
    if (!confirm('Are you sure you want to delete this issue? This action cannot be undone.')) {
        return;
    }
    
    if (issueId) {
        const index = sampleIssues.findIndex(i => i.id === issueId);
        if (index > -1) {
            sampleIssues.splice(index, 1);
            filteredIssues = [...sampleIssues];
            
            if (getCurrentPage() === 'admin_dashboard') {
                loadAdminDashboard();
            } else {
                window.location.href = 'home.html';
            }
            
            showAlert('Issue deleted successfully', 'success');
        }
    }
}

function exportData() {
    const dataStr = JSON.stringify(sampleIssues, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'civictrack_issues.json';
    link.click();
    
    showAlert('Data exported successfully', 'success');
}

function refreshData() {
    // Simulate data refresh
    showAlert('Data refreshed', 'info');
    
    if (getCurrentPage() === 'admin_dashboard') {
        loadAdminDashboard();
    } else if (getCurrentPage() === 'home') {
        loadHomePage();
    }
}

// View toggle functionality
function handleViewToggle(e) {
    const viewType = e.target.dataset.view || e.target.closest('[data-view]').dataset.view;
    const container = document.getElementById('issues-container');
    
    if (!container) return;
    
    // Update active button
    document.querySelectorAll('[data-view]').forEach(btn => btn.classList.remove('active'));
    e.target.closest('[data-view]').classList.add('active');
    
    // Update container classes
    if (viewType === 'list') {
        container.className = 'row';
        container.querySelectorAll('.col-md-6.col-xl-4').forEach(col => {
            col.className = 'col-12 mb-3';
        });
    } else {
        container.className = 'row';
        container.querySelectorAll('.col-12').forEach(col => {
            col.className = 'col-md-6 col-xl-4 mb-4';
        });
    }
}

// User display functionality
function updateUserDisplay() {
    const userElements = document.querySelectorAll('#currentUser, #currentAdmin');
    userElements.forEach(element => {
        if (element) element.textContent = currentUser.username;
    });
}

// Utility functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }
    }, 5000);
}

function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function setupAnimations() {
    // Add animation classes to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .info-card, .issue-card').forEach(el => {
        observer.observe(el);
    });
}

// Global functions for onclick handlers
window.viewIssueDetail = viewIssueDetail;
window.flagIssue = flagIssue;
window.deleteIssue = deleteIssue;
window.quickStatusUpdate = quickStatusUpdate;
window.getCurrentLocation = getCurrentLocation;
window.getCurrentLocationForForm = getCurrentLocationForForm;
window.exportData = exportData;
window.refreshData = refreshData;