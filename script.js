document.getElementById('fetchButton').addEventListener('click', fetchPosts);
document.getElementById('postForm').addEventListener('submit', postData);

function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => displayPosts(data))
        .catch(error => console.error('Error fetching posts:', error));
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.slice(0, 5).forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h3 class="text-primary">${post.title}</h3>
            <p>${post.body}</p>`;
        postsContainer.appendChild(postDiv);
    });
}

function postData(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Post created successfully!');
            document.getElementById('postForm').reset();
        })
        .catch((error) => {
            console.error('Error posting data:', error);
        });
}
