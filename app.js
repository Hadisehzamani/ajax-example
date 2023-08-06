let xhr = new XMLHttpRequest();
const container = document.querySelector('.container');
const commentsContainer = document.querySelector('.commentsContainer');
const postContainer = document.querySelector('.postContainer');
const posth1 = document.querySelector('.post')
const commenth1 = document.querySelector('.comment')

showUsers();
container.addEventListener('click', showUsersPosts);
postContainer.addEventListener('click', showComments); 

function showUsers() {
  var users = httpAjaxRequest('https://jsonplaceholder.typicode.com/users', userList);
}

function httpAjaxRequest(address, targetFunc) {
  xhr.onload = function () {
    var result = JSON.parse(xhr.responseText);
    targetFunc(result);
  };
  
  xhr.open('GET', address);
  xhr.send();
}

function showUsersPosts(e) {
  if (e.target.nodeName == 'A') {
    posth1.style.display = 'block'
    const userId = e.target.dataset.id;
    getPostsByUserId(userId, function(posts) {
      if (posts.length > 0) {
        commentsContainer.innerHTML = '';
        postContainer.innerHTML = '';
        posts.forEach(post => {
          postContainer.innerHTML += `<div class="post">
                                        <div class="post-body">
                                          <h3 class="post-title">${post.title}</h3>
                                          <p class="post-text">${post.body}</p>
                                          <a href="#" class="btn btn-primary" data-postid="${post.id}">comments</a>
                                        </div>
                                      </div>`;
        });
      }
    });
  }
}

function getPostsByUserId(userId, callback) {
  httpAjaxRequest('https://jsonplaceholder.typicode.com/posts', function(posts) {
    const postsByUser = posts.filter(post => post.userId == userId);
    callback(postsByUser);
  });
}

function userList(users) {
  users.map(function (item) {
    container.innerHTML += `<div class="card">
                              <div class="card-body">
                                <h3 class="card-title">${item.id} : ${item.name}</h3>
                                <p class="card-text">${item.username}</p>
                                <p class="card-text">${item.email}</p>
                                <a href="#" class="btn-primary" data-id="${item.id}">Post</a>
                              </div>
                            </div>`;
  });
}

function getCommentsByPostId(postId, callback) {
  httpAjaxRequest('https://jsonplaceholder.typicode.com/comments', function(comments){
    const commentsForPost = comments.filter(comment => comment.postId == postId);
    callback(commentsForPost);
  });
}



function showComments(e) {
  if (e.target.nodeName == 'A') {
    commenth1.style.display = 'block'
    e.preventDefault(); 
    let postId = e.target.dataset.postid;
    getCommentsByPostId(postId, function(comments){
      commentsContainer.innerHTML = '';
      comments.forEach(comment => {
        commentsContainer.innerHTML += `<div class="comment">
                                          <div class="comment-body">
                                            <h3 class="comment-title">${comment.name}</h3>
                                            <p class="comment-text">${comment.email}</p>
                                            <p>${comment.body}</p>
                                          </div>
                                        </div>`;
      });
    });
  }
}

