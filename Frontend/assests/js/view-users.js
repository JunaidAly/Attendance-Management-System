document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#users-table tbody');

    try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Include token for authentication
        });

        const users = response.data.users;

        users.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching users:', error.response.data.error);
        alert(error.response.data.error || 'Failed to fetch users.');
    }
});
