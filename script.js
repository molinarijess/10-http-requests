const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.getElementById("new-post");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

//function sendHttppRequest(method, url, data) {
// const promise = new Promise((resolve, reject) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open(method, url);
//   xhr.responseType = "json";

//   xhr.onload = function () {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       resolve(xhr.response);
//     } else {
//       reject(new Error("something went wrong!"));
//     }
//   };

//   xhr.onerror = function () {
//     reject(new Error("failed to send request!"));
//   };

//   xhr.send(JSON.stringify(data));
// });

// return promise;

//   return fetch(url, {
//     method: method,
//     body: JSON.stringify(data),
//   }).then((response) => {
//     return response.json();
//   });
// }

//function fetchPosts() {
//try {
// sendHttppRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(
//   (responseData) => {
//     const listOfPosts = responseData;
//     for (const post of listOfPosts) {
//       const postEl = document.importNode(postTemplate.content, true);
//       postEl.querySelector("h2").textContent = post.title.toUpperCase();
//       postEl.querySelector("p").textContent = post.body;
//       postEl.querySelector("li").id = post.id;
//       listElement.append(postEl);
//     }
//   }
// );
// } catch (error) {
//   alert(error.message);
// }
// }

async function fetchPosts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOfPosts = response.data;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
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

  const response = await axios.post(
    "https:jsonplaceholder.typicode.com/posts",
    post
  );
  console.log(response);
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
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    document.getElementById(postId).remove();
  }
});
