const btn = document.querySelector(".btn")
const input = document.querySelector(".input")
const card = document.querySelector('.card')

const values= {};

btn.addEventListener("click", () => {
  const username = input.value;
  try {
  fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())
  .then(user => {
    console.log(user);

      card.innerHTML = 
   `<img src=${user.avatar_url} alt="">
      <h3>${user.login}</h3>
      <p>${user.bio}</p>

      <div>
        <div>
        <p>${user.followers}</p>
        <p>FOLLOWERS</p>
      </div>
        <div>
        <p>${user.public_repos}</p>
        <p>REPOS</p>
      </div>
        <div>
        <p></p>
        <p>TOP LANG</p>
      </div>
      </div>

      <div>
        <div>
          <h3></h3>
        </div>
      </div>
  `
  })
  .catch(err => {
    alert('User not found')
   console.log('User not found', err);
  })
  } catch (error) {
     console.log('User not found');
  }

  const repoinfo =  fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then((repos) => {
    console.log(repos);

    const filteredRepos =  repos.filter(repo => repo.fork )
    const descRepo = filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count
)
   const langCount = descRepo.reduce((acc, repo) => {
    let language= repo[language];

     language = (repo[language] || 0 ) + 1;
   })
    return descRepo && langCount ;
  }, {} )

  console.log(repoinfo);



})