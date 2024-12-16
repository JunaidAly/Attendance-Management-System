document.getElementById('edit-profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const profilePicture = document.getElementById('profilePicture').files[0];
    formData.append('profilePicture', profilePicture);

    try {
        const response = await axios.post('http://localhost:5000/api/admin/profile-picture', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert(response.data.message);
        document.getElementById('preview').innerHTML = `<img src="${response.data.url}" alt="Profile Picture" />`;
    } catch (error) {
        console.error('Error updating profile picture:', error.response?.data || error.message);
        alert('Failed to update profile picture.');
    }
});
