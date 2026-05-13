const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const card = document.querySelector(".card");

btn.addEventListener("click", async () => {

  const username = input.value.trim();

  if (!username) return;

  const cacheKey = `github_${username}`;

  try {

    // =========================
    // CHECK LOCAL STORAGE
    // =========================
    const cachedData = JSON.parse(localStorage.getItem(cacheKey));

    if (cachedData) {

      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000;

      // CHECK IF CACHE IS STILL VALID
      if (currentTime - cachedData.timestamp < oneHour) {

        console.log("Loaded from localStorage");

        renderUser(cachedData.user);

        return;
      }
    }

    // =========================
    // FETCH NEW DATA
    // =========================
    const res = await fetch(`https://api.github.com/users/${username}`);

    const user = await res.json();

    if (user.message === "Not Found") {
      throw new Error("User not found");
    }

    // =========================
    // SAVE TO LOCAL STORAGE
    // =========================
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        user,
        timestamp: Date.now()
      })
    );

    console.log("Fetched from API");

    renderUser(user);

  } catch (error) {

    console.log(error);

    card.innerHTML = `
      <h2>User Not Found</h2>
    `;
  }
});


// =========================
// RENDER FUNCTION
// =========================
function renderUser(user) {

  card.innerHTML = `
    <img src="${user.avatar_url}" alt="">

    <h3>${user.login}</h3>

    <p>${user.bio || "No bio available"}</p>

    <div>
      <div>
        <p>${user.followers}</p>
        <p>FOLLOWERS</p>
      </div>

      <div>
        <p>${user.public_repos}</p>
        <p>REPOS</p>
      </div>
    </div>
  `;
}