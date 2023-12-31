// host

const { host } = new URL(window.location.href);





// Selecting Elements

const form = document.querySelector('#set-password-form');
const newPassword = document.querySelector('#new-password');
const confirmPassword = document.querySelector('#confirm-password');

// On submit form

const id = new URLSearchParams(window.location.search).get("id");

form.addEventListener('submit', resetPassword);
async function resetPassword(e) {
    e.preventDefault();
    if(newPassword.value.length >= 8) {
        if(newPassword.value === confirmPassword.value) {
            try {
                await axios.post(`http://${host}/forgot-password/reset-password?id=` + id, { newPassword: newPassword.value });
                window.location.href = 'login.html';
            } catch (error) {
                console.log(error);
            }
        } else console.log('Password doen\'t match');
    } else console.log('passwprd is too short');
}