//logout user 
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Remove token from localStorage
            localStorage.removeItem('token');

            // Redirect to the login page
            window.location.href = '/index.html';
        });
    }
});

//view users button
const viewUsersBtn = document.getElementById('view-users');
if (viewUsersBtn) {
    viewUsersBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = './view-users.html';
    });
}

//manage attendance button
const manageAttendanceBtn = document.getElementById('manage-attendance');
if (manageAttendanceBtn) {
    manageAttendanceBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = './manage-attendance.html';
    });
}

//approve leave button
const approveLeaveBtn = document.getElementById('leave-requests');
if (approveLeaveBtn) {
    approveLeaveBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = './leave-approval.html';
    });
}

//generate report button
const generateReportBtn = document.getElementById('generate-reports');
if (generateReportBtn) {
    generateReportBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = './generate-reports.html';
    });
}

//edit profile button
const editProfileBtn = document.getElementById('edit-profile');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = './edit-profile.html';
    });
}