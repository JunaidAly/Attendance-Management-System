//1.  Register form
const registrationForm = document.getElementById('registration-form');

// Add an event listener for the form submission
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Collect the form data
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        // Send the data to the backend API
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }), // Send data as JSON
        });

        // Parse the response
        const data = await response.json();

        if (response.ok) {
            // Success: Show success message and redirect
            alert('Registration successful!');
            window.location.href = '../index.html'; // Redirect to login page
        } else {
            // Error: Show error message from the server
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        // Handle fetch errors (e.g., network issues)
        console.error('Error:', error);
        alert('An error occurred while registering. Please try again later.');
    }
});

