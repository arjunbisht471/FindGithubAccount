let getUserDetail = async () => {
    try {
        let username = document.getElementById("username").value.trim();
        if (!username) {
            alert('Please enter a GitHub username.');
            return;
        }
        
        let URL = `https://api.github.com/users/${username}`;
        let userDetail = document.getElementById("userDetail");

        userDetail.innerHTML = '';

        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let data = await response.json();
       console.log(data);
        let image = document.createElement("img");
        image.id = "user-img";
        image.src = data.avatar_url;
        userDetail.appendChild(image);

        let name = document.createElement("p");
        name.classList.add("user-name");
        name.innerHTML = `<span class='name-text'>Name: </span> ${data.name || 'Not available'}`;
        userDetail.appendChild(name);

        
        let followers = document.createElement("p");
        followers.innerHTML = `Followers: ${data.followers}  Following: ${data.following}`;
        userDetail.appendChild(followers);


        let bio = document.createElement("p");
        bio.innerHTML = ` ${data.bio || 'Not available'}`;
        userDetail.appendChild(bio);

        let repos = document.createElement("p");
        repos.textContent = `Public Repos: ${data.public_repos}`;
        userDetail.appendChild(repos);

        let githubLinkBtn = document.createElement("a");
        githubLinkBtn.classList.add("github-link");
        githubLinkBtn.textContent = "View on GitHub";
        githubLinkBtn.href = data.html_url;
        userDetail.appendChild(githubLinkBtn);

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch user data. Please try again later.');
    }
};
