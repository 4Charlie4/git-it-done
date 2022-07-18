var userFormEl = document.querySelector("#user-form");
var userInputEl = document.querySelector("#username");

var repoContEl = document.querySelector("#repos-container");
var repoSearchName = document.querySelector("#repo-search-term");
var langBtnsEl = document.querySelector("#language-buttons");

// getting repos and info
var getUserRepos = function(user) {
    
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

   fetch(apiUrl)
   .then(function(response){
    if (response.ok) {
        response.json()
        .then(function(data){
            displayRepos(data,user);
        });
    } else {
        alert("Error: User not Found");
    }
 })
    //catch connection errors 
    .catch(function(error){
        alert("Unable to connect to GitHub");
    });
};

    


//function that handles form event
var formSubmitHandler = function(event) {

    event.preventDefault();

    var username = userInputEl.value.trim();

   

    if (username) {
        getUserRepos(username);
        userInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }

};

//displaying repos and info
var displayRepos = function(repos, searchTerm) {

    if (repos.length === 0) {
        repoContEl.textContent = "No Repositories found.";
        return;
    };

    //clear out and replace previously displayed content
    repoContEl.textContent = "";
    repoSearchName.textContent = searchTerm;

    //loop over each repo
    for (var i = 0; i<repos.length; i++) {
        //format the repos name that displays
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //span to hold repo name
        var repoNameEl = document.createElement("span");
        repoNameEl.textContent = repoName;

        // appending repo name to container that holds each repo
        repoEl.appendChild(repoNameEl);

        //issues icon display/num of issues
        var issuesEl = document.createElement("span");
        issuesEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            issuesEl.innerHTML =
                "<i class= 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + 'issue(s)';
        } else {
            issuesEl.innerHTML = 
            "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        
        repoEl.appendChild(issuesEl);

        //appending repo container to the DOM
        repoContEl.appendChild(repoEl);
    }
};

var getLanguageRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    
    fetch(apiUrl).then(function(response) {

        if (response.ok) {

            response.json().then(function(data) {

                displayRepos(data.items, language);

                console.log(data.items);

            })
            
        } else {
            alert("GitHub user not found!");
        }
    });

};

//upon language button click displays repos based off of chosen language
var langButtonsClick = function(event) {

    var lang = event.target.getAttribute("data-language");
    
    if (lang) {
        //fetchs from repos based off of chosen language
        getLanguageRepos(lang);
        //clears content on the right while above call loads
        repoContEl.textContent = "";
    }
    
}

userFormEl.addEventListener("submit", formSubmitHandler);

langBtnsEl.addEventListener("click", langButtonsClick);