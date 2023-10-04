document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("github-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let input = document.getElementById("search").ariaValueMax;
        fetchNames(input);
    });
});

  function fetchNames(users) {
    fetch(`https://api.github.com/users/${users}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then((response) => response.json())
      .then((user) => renderUsers(user));
  }

  function renderUsers(user) {
    console.log(user);
    let ul = document.getElementById("user-list");
    let li = document.createElement("li");
    li.innerHTML = `
      <a href="${user.html_url}"><img src="${user.avatar_url}" />${user.login}</a>
      <h3>${user.login}</h3>
      <p style="font-style: italic">${user.public_repos} repositories</p>
      <button id="repositories">View Repositories</button>
    `;
    ul.appendChild(li);
  
    let link = `https://api.github.com/users/${user.login}/repos`;
  
    let repo = document.getElementById("repositories");
    repo.addEventListener("click", () => {
      repoLink(link);
    });
  }
  
  function repoLink(userRepos) {
    fetch(userRepos, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then((resp) => resp.json())
      .then((names) => {
        repoNames(names);
      });
  }
  
  let clicked = true;
  function repoNames(names) {
    if (clicked) {
      names.forEach((name) => {
        let repoContainer = document.getElementById("repos-list");
        let li = document.createElement("li");
        li.textContent = name.name;
        repoContainer.appendChild(li);
      });
      clicked = false;
    }
  }
  
