const searchBtn = document.getElementById("searchBtn");
const profileDiv = document.getElementById("profile");
const errorDiv = document.getElementById("error");

searchBtn.addEventListener("click", getProfile);

async function getProfile() {
    const username = document.getElementById("username").value.trim();

    profileDiv.innerHTML = "";
    errorDiv.innerHTML = "";

    if (!username) {
        errorDiv.textContent = "Please enter a username!";
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();

        profileDiv.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}" alt="Avatar">
                <h3>${data.name || "Not Available"}</h3>
                <p><strong>Username:</strong> ${data.login}</p>
                <p><strong>Bio:</strong> ${data.bio || "No bio"}</p>

                <div class="stats">
                    <div>
                        <strong>Repos</strong>
                        <p>${data.public_repos}</p>
                    </div>
                    <div>
                        <strong>Followers</strong>
                        <p>${data.followers}</p>
                    </div>
                    <div>
                        <strong>Following</strong>
                        <p>${data.following}</p>
                    </div>
                </div>

                <a href="${data.html_url}" target="_blank">View Profile</a>
            </div>
        `;
    } catch (error) {
        errorDiv.textContent = "User not found!";
    }
}
