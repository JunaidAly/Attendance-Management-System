document.getElementById('leave-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const reason = document.getElementById('reason').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const userId = localStorage.getItem('userId'); // Fetch userId from localStorage

    // if (!userId) {
    //     alert('User ID not found. Please log in again.');
    //     window.location.href = '/index.html';
    //     return;
    // }

    try {
        const response = await axios.post('http://localhost:5000/api/leaveReq/leave', {
            userId, // Send the userId dynamically
            reason,
            fromDate,
            toDate,
        });

        alert(response.data.message || 'Leave request submitted successfully!');
    } catch (error) {
        console.error('Error submitting leave request:', error);
        alert(error.response?.data?.message || 'Failed to submit leave request.');
    }
});
