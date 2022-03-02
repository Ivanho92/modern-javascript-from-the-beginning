// CommonJS Module Syntax
  // const myVariable = require('./mymodule'); (works only when using module.exports = {...})

// ES2015 Module
  // A) import { myVariable, myFunction } from './mymodule2';
  // B) import * as mod from './mymodule2';
  // C) import myFunction from './mymodule2';  (works only when you attribute an export as "default")

import { easyHttp } from "./EasyHTTP";
import { ui } from "./UI";

// Setup variables
let currentPost = {};

// Event Listeners
document.addEventListener("DOMContentLoaded", getPosts); // Initialization
document.getElementById('back-btn').addEventListener('click', ui.enterDefaultState); // Enter default state / exit edit state
ui.uiSelectors.form.addEventListener('submit', e => {
  if (e.submitter.id === 'submit-btn') submitPost(e); // Add a new post
  if (e.submitter.id === 'update-btn') updatePost(e, currentPost); // Update an existing post
});
ui.uiSelectors.postsList.addEventListener('click', e => {
  if (e.target.className.includes('fas fa-times')) deletePost(e); // Delete an existing post
  if (e.target.className.includes('fas fa-pencil-alt')) editPost(e); // Enter edit state for an existing post
});

// Load & display posts
function getPosts() {
  easyHttp.get('http://localhost:3000/posts?_sort=id&_order=desc')
    .then(posts => ui.showPosts(posts))
    .catch(error => console.log(error));
}


// Add a new post
function submitPost(e) {
  e.preventDefault();

  const title = ui.uiSelectors.postTitleInput.value;
  const body = ui.uiSelectors.postBodyInput.value;

  if (title !== '' && body !== '') {
    const data = {
      title,
      body
    };
  
    easyHttp.post('http://localhost:3000/posts', data)
      .then(response => {
        ui.showAlert('Your post has been successfully added', 'success');
        ui.clearInputs();
        getPosts();
      })
      .catch(error => {
        console.error(error);
        ui.showAlert(`Something went wrong: ${error.message}`, 'danger');
      })
  } else {
    ui.showAlert(`Please fill in all fields`, 'danger');
  }

}


// Delete a post
function deletePost(e) {
  e.preventDefault();

  // Get ID
  let id = e.target.parentNode.parentNode.id;
  id = parseInt(id.split('-')[1]);
  
  easyHttp.delete(`http://localhost:3000/posts/${id}`)
  .then(response => {
    ui.showAlert('Your post has been successfully deleted', 'success');
    getPosts();
  })
  .catch(error => {
    console.error(error);
    ui.showAlert(`Something went wrong: ${error.message}`, 'danger');
  })
}


// Edit a post
function editPost(e) {
  e.preventDefault();

  // Get ID
  let id = e.target.parentNode.parentNode.id;
  id = parseInt(id.split('-')[1]);
  
  // Fetch data from JSON Server
  easyHttp.get(`http://localhost:3000/posts/${id}`)
    .then(post => {
      ui.enterEditState(post);
      currentPost = post;
    })
    .catch(error => console.error(error));
}

// Update a post
function updatePost(e, post) {
  e.preventDefault();

  const title = ui.uiSelectors.postTitleInput.value;
  const body = ui.uiSelectors.postBodyInput.value;
  
  if (title !== '' && body !== '') {
    const data = {
      title,
      body
    };
  
    // Update data to JSON Server
    easyHttp.put(`http://localhost:3000/posts/${post.id}`, data)
      .then(response => {
        ui.showAlert('Your post has been successfully updated', 'success');
        ui.enterDefaultState();
        getPosts();
      })
      .catch(error => {
        console.error(error);
        ui.showAlert(`Something went wrong: ${error.message}`, 'danger');
      });
  } else {
    ui.showAlert(`Please fill in all fields`, 'danger');
  }
  
}