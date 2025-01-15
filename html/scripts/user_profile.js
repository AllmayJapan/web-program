async function fetchUserProfile() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('user_id');
    
    if (!userId) {
        alert('User ID is missing.');
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

            const currentUserId = result.current_user_id;
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

                if (currentUserId === post.user_id) {
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'delete-button';
                    deleteButton.addEventListener('click', () => deletePost(post.post_id));

                    listItem.appendChild(deleteButton);
                }

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

async function deletePost(postId) {
    if (!postId) {
        alert('Invalid post ID.');
        return;
    }
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        const response = await fetch('/delete_post.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `post_id=${postId}`
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            fetchPosts();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function goback() {
    window.history.back();
}

window.addEventListener('DOMContentLoaded', fetchUserProfile);
