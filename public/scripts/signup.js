//host

// const { host } = new URL(window.location.href);

const host = 'localhost:4000';






document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('signup-form');
    const alertDiv = document.getElementById('alert-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await axios.post(`http://${host}/user/signup`, userData);
            
            if (response.data.success) {
                showAlert('Signup successful!', 'success');
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                showAlert(error.response.data, 'danger');
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        }
    });

    function showAlert(message, type) {
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.display = '';

        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 5000);
    }
});