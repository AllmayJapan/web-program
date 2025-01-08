async function fetchUserProfile() {
    try {
        const response = await fetch('/get_user_profile.php');
        const result = await response.json();

        if (result.success) {
            document.getElementById('username').textContent = result.user.username;
            document.getElementById('registration-date').textContent = result.user.registration_date;
        } else {
            alert('Failed to get User Infomation: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function goBack() {
    window.location.href = '/';
}

window.addEventListener('DOMContentLoaded', fetchUserProfile);
