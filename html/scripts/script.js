const postButton = document.getElementById('post-button');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const postList = document.getElementById('post-list');

async function checkAuth(){
    const response = await fetch('/check_auth.php');
    const result = await response.json();

    if (!result.loggedIn) {
        alert('Please log in to continue');
        window.location.href = 'auth/';
    }
}

document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        const response = await fetch('/logout.php');
        if (response.ok) {
            window.location.href = '/auth/';
        }else {
            alert('Logout failed. Please try again.');
        }
    } catch (error) {
        alert('Error during logout: ' + error.message);
    }
});

async function savePost(title, content) {
	try {
		const response = await fetch('/check_auth.php');
        const authResult = await response.json();

        if(!authResult.loggedIn) {
            alert('Please log in to continue');
            window.location.href = '/auth/';
            return;
        }
        const responsePost = await fetch('/save_post.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content })
        });

		const result = await responsePost.json();
		if (result.success) {
			alert(result.message);
			fetchPosts();
		} else {
			alert('エラー: ' + result.message);
		}
	} catch (error) {
		alert('通信エラー: ' + error.message);
	}
}

async function fetchPosts() {
    try {
        const response = await fetch('/fetch_posts.php');
        const posts = await response.json();
        postList.innerHTML = ''; // リストをクリア

        if (Array.isArray(posts)) { // データが配列か確認
            posts.forEach(post => {
                const listItem = document.createElement('li');
                listItem.className = 'post-item';

                const postTitleElem = document.createElement('div');
                postTitleElem.className = 'post-title';
                postTitleElem.textContent = post.title;

                const postContentElem = document.createElement('div');
                postContentElem.className = 'post-content';
                postContentElem.textContent = post.content;

                const postMetaElem = document.createElement('div');
                postMetaElem.className = 'post-meta';
                postMetaElem.textContent = `posted by: ${post.username} | sent by: ${post.created_at}`;

                const userLink = document.createElement('a');
                userLink.href = `/profile?user_id=${post.user_id}`;
                userLink.textContent = `posted by: ${post.username}`;
                userLink.className = 'user-link';

                const postDate = document.createElement('span');
                postDate.textContent = ` | posted: ${post.created_at}`;

                postMetaElem.appendChild(userLink);
                postMetaElem.appendChild(postDate);

                listItem.appendChild(postTitleElem);
                listItem.appendChild(postContentElem);
                listItem.appendChild(postMetaElem);

                postList.appendChild(listItem); // 正しく追加
            });
        } else {
            alert('投稿一覧のデータ形式が正しくありません');
        }
    } catch (error) {
        alert('投稿一覧の取得に失敗しました: ' + error.message);
    }
}

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}

function addPost(title, content) {
    const listItem = document.createElement('li');
    listItem.className = 'post-item';
    
    const postTitleElem = document.createElement('div');
    postTitleElem.className = 'post-title';
    postTitleElem.textContent = title;
    
    const postContentElem = document.createElement('div');
    postContentElem.className = 'post-content';
    postContentElem.textContent = content;
    
    const postMetaElem = document.createElement('div');
    postMetaElem.className = 'post-meta';
    postMetaElem.textContent = `Posting Date: ${getCurrentDateTime()}`;

    listItem.appendChild(postTitleElem);
    listItem.appendChild(postContentElem);
    listItem.appendChild(postMetaElem);

    postList.appendChild(listItem);
}

postButton.addEventListener('click', () => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (title && content) {
        savePost(title, content);
        postTitle.value = '';
        postContent.value = '';
    } else {
        alert('Please enter both the title and the article.');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    fetchPosts();
});
