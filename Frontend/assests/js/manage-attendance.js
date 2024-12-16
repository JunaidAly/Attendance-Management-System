document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#attendance-table tbody');

    try {
        const response = await axios.get('http://localhost:5000/api/admin/attendance');
        const attendanceRecords = response.data.attendance;

        attendanceRecords.forEach((record) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.userId.username}</td>
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.status}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching attendance:', error.message);
        alert('Failed to load attendance records.');
    }
});
