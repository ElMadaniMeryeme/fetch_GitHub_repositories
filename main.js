//Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton =document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function(){
    getRepos();
};

//Get Repos function
function getRepos(){
    if(theInput.value === "" || theInput.value === null){
        reposData.innerHTML = "<span>Please Write GitHub Username</span>";
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((response) => response.json())
            .then((repos) => {

                //Empty The Container
                reposData.innerHTML = "";

                //Loop On Repositories
                repos.forEach(repo => {

                    //Create The Main div elt
                    let mainDiv = document.createElement("div");

                    //Create Repo Name Text
                    let repoName = document.createTextNode(repo.name);

                    //Append The Text to main div
                    mainDiv.appendChild(repoName);

                    //Create Repo URL
                    let theUrl = document.createElement('a');

                    //Create repo url text
                    let theUrlText = document.createTextNode("Visit");

                    //Append the repo url text to anchor tag
                    theUrl.appendChild(theUrlText);

                    //Add the hypertext reference
                    theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

                    //Set Attribute blank
                    theUrl.setAttribute('target', '_blank');

                    //Append url anchor to main div
                    mainDiv.appendChild(theUrl);

                    //Create Stars Count Span
                    let starsSpan = document.createElement("span");

                    //Create The Stars Count Text
                    let starsText = document.createTextNode(`Stars: ${repo.stargazers_count}`);

                    //Add Stars count text to stars span
                    starsSpan.appendChild(starsText);

                    //Append Stars count span to main div
                    mainDiv.appendChild(starsSpan);

                    //Add class on mainDiv
                    mainDiv.className = 'repo-box';

                    //Append the main div to container
                    reposData.appendChild(mainDiv);
                })

            });
    }
}