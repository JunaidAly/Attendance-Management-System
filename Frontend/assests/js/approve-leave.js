document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#leave-table tbody');

    try {
        const response = await axios.get('http://localhost:5000/api/leaves');
        const leaveRequests = response.data.leaves;

        leaveRequests.forEach((leave) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${leave.userId.username}</td>
                <td>${leave.reason}</td>
                <td>${new Date(leave.startDate).toLocaleDateString()}</td>
                <td>${new Date(leave.endDate).toLocaleDateString()}</td>
                <td>${leave.status}</td>
                <td>
                    <button class="approve-btn" data-id="${leave._id}">Approve</button>
                    <button class="reject-btn" data-id="${leave._id}">Reject</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.approve-btn').forEach((button) =>
            button.addEventListener('click', async (event) => {
                const leaveId = event.target.getAttribute('data-id');
                await updateLeaveStatus(leaveId, 'approved');
            })
        );

        document.querySelectorAll('.reject-btn').forEach((button) =>
            button.addEventListener('click', async (event) => {
                const leaveId = event.target.getAttribute('data-id');
                await updateLeaveStatus(leaveId, 'rejected');
            })
        );
    } catch (error) {
        console.error('Error fetching leaves:', error.message);
        alert('Failed to load leave requests.');
    }
});

async function updateLeaveStatus(leaveId, status) {
    try {
        await axios.put(`http://localhost:5000/api/admin/leave/${leaveId}`, { status });
        alert(`Leave request ${status}`);
        location.reload();
    } catch (error) {
        console.error(`Error updating leave status:`, error.message);
        alert(`Failed to ${status} leave request.`);
    }
}
