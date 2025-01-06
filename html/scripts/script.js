const postButton = document.getElementById('post-button');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const postList = document.getElementById('post-list');

async function savePost(title, content) {
	try {
		const response = await fetch('/save_post.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content })
		});
		const result = await response.json();
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
		postList.innerHTML = '';
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
			postMetaElem.textContent = `投稿日時: ${post.created_at}`;

			listItem.appendChild(postTitleElem);
			listItem.appendChild(postContentElem);
			listItem.appendChild(postMetaElem);
			listItem.appendChild(listItem);

		});
	} catch(error) {
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

window.addEventListener('DOMContentLoaded', fetchPosts);
