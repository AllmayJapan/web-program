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

            const postsContainer = document.getElementById('user-posts');
            postsContainer.innerHTML = '';

            result.posts.forEach(post => {
                const listItem = document.createElement('li');
                listItem.className = 'post-item';

                
                const titleElem = document.createElement('div');
                titleElem.className = 'post-title';
                titleElem.textContent = post.title;

                const contentElem = document.createElement('div');
                contentElem.className = 'post-content';
                contentElem.textContent = post.content;

                const metaElem = document.createElement('div');
                metaElem.className = 'post-meta';
                metaElem.textContent = `Posted on: ${post.created_at}`;

                listItem.appendChild(titleElem);
                listItem.appendChild(contentElem);
                listItem.appendChild(metaElem);
                postsContainer.appendChild(listItem);

            });
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
