async function fetchUserProfile() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('user_id');
    
    if (!userId) {
        alert('User ID is missiong.');
        return;
    }

    try {
        const response = await fetch(`/get_user_profile.php?user_id=${userId}`);
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

function goback() {
    window.history.back();
}

window.addEventListener('DOMContentLoaded', fetchUserProfile);
