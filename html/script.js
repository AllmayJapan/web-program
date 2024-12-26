const postButton = document.getElementById('post-button');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const postList = document.getElementById('post-list');

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
        addPost(title, content);
        postTitle.value = '';
        postContent.value = '';
    } else {
        alert('Please enter both the title and the article.');
    }
});
