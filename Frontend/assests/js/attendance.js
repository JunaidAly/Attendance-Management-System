document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mark-attendance-btn').addEventListener('click', async () => {
        const status = document.getElementById('status').value;
    
        try {
            // Fetch userId dynamically from the backend
            const { data } = await axios.get('http://localhost:5000/api/auth/verify', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
    
            const userId = data.user._id;
    
            const response = await axios.post('http://localhost:5000/api/attendance/mark', {
                status,
                userId,
            });
    
            alert(response.data.message);
        } catch (error) {
            console.error('Error marking attendance:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Failed to mark attendance.');
        }
    });
    
});

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#attendance-table tbody');

    try {
        const response = await axios.get('http://localhost:5000/api/attendance');
        const attendanceRecords = response.data.attendance;

        attendanceRecords.forEach((record) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.status}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching attendance records:', error.response.data.error);
        alert(error.response.data.error || 'Failed to fetch attendance records.');
    }
});

