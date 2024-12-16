
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-Form').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    
            // Save the token
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Redirect based on role
            if (response.data.user.role === 'admin') {
                window.location.href = '/admin/dashboard.html';
            } else if (response.data.user.role === 'user') {
                window.location.href = '/user/dashboard.html';
            } else {
                alert('Unknown role. Contact support.');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data?.error || error.message);
            alert(error.response?.data?.error || 'Login failed. Please try again.');
        }
        
    });
 
});

//Logout User
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

//mark attendance button
const markAttendanceBtn = document.getElementById('mark-attendance');

if (markAttendanceBtn) {
    markAttendanceBtn.addEventListener('click',() => {
        localStorage.removeItem('token');
        window.location.href = './attendance.html';
    }
    );
}

//edit profile button
const editProfileBtn = document.getElementById('edit-profile');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click',() => {
        localStorage.removeItem('token');
        window.location.href = './edit-profile.html';
    }
    );
}

//view attendance button
const viewAttendanceBtn = document.getElementById('view-attendance');
if (viewAttendanceBtn) {
    viewAttendanceBtn.addEventListener('click',() => {
        localStorage.removeItem('token');
        window.location.href = './view-attendance.html';
    }
    );
}

//mark leave button
const markLeaveBtn = document.getElementById('mark-leave');
if (markLeaveBtn) {
    markLeaveBtn.addEventListener('click',() => {
        localStorage.removeItem('token');
        window.location.href = './leave.html';
    }
    );
}

//mark attendance
// document.getElementById("mark-attendance").addEventListener("click", async () => {
//     const token = localStorage.getItem("token");

//     try {
//         const response = await axios.post(
//             "http://localhost:5000/api/user/attendance",
//             { date: new Date().toISOString().split("T")[0], status: "Present" },
//             { headers: { Authorization: `Bearer ${token}` } }
//         );
//         alert("Attendance marked successfully!");
//     } catch (err) {
//         console.error(err);
//         alert("Error marking attendance!");
//     }
// });
// //request leave
// document.getElementById("mark-leave").addEventListener("click", async () => {
//     const token = localStorage.getItem("token");

//     const reason = prompt("Enter the reason for leave:");

//     if (!reason) return alert("Leave reason is required!");

//     try {
//         const response = await axios.post(
//             "http://localhost:5000/api/user/leave",
//             { reason },
//             { headers: { Authorization: `Bearer ${token}` } }
//         );
//         alert("Leave request sent successfully!");
//     } catch (err) {
//         console.error(err);
//         alert("Error requesting leave!");
//     }
// });
// //profile picture upload
// document.getElementById("edit-profile-form").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const fileInput = document.getElementById("profile-picture");
//     const formData = new FormData();
//     formData.append("profilePicture", fileInput.files[0]);

//     const token = localStorage.getItem("token");

//     try {
//         const response = await axios.post("http://localhost:5000/api/user/profile-picture", formData, {
//             headers: { 
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "multipart/form-data"
//             },
//         });
//         alert("Profile picture updated successfully!");
//     } catch (err) {
//         console.error(err);
//         alert("Error updating profile picture!");
//     }
// });

