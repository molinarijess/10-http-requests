const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.getElementById("new-post");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttppRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    //const listOfPosts = JSON.parse(xhr.response);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error("something went wrong!"));
      }
    };

    xhr.onerror = function () {
      reject(new Error("failed to send request!"));
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
}

function fetchPosts() {
  try {
    sendHttppRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(
      (responseData) => {
        const listOfPosts = responseData;
        for (const post of listOfPosts) {
          const postEl = document.importNode(postTemplate.content, true);
          postEl.querySelector("h2").textContent = post.title.toUpperCase();
          postEl.querySelector("p").textContent = post.body;
          postEl.querySelector("li").id = post.id;
          listElement.append(postEl);
        }
      }
    );
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttppRequest("POST", "https:jsonplaceholder.typicode.com/posts", post);
}

fetchButton.addEventListener("click", fetchPosts);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    sendHttppRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    document.getElementById(postId).remove();
  }
});
