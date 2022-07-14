var userFormEl = document.querySelector("#user-form");
var userInputEl = document.querySelector("#username");

var repoContEl = document.querySelector("#repos-container");
var repoSearchName = document.querySelector("#repo-search-term");

// getting repos and info
var getUserRepos = function(user) {
    
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayRepos(data, user);
            console.log(data);
        });
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

    //clear out and replace previously displayed content
    repoContEl.textContent = "";
    repoSearchName.textContent = searchTerm;

    //loop over each repo
    for (var i = 0; i<repos.length; i++) {
        //format the repos name that displays
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

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
            issuesEl.innerHTMl = 
            "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        
        repoEl.appendChild(issuesEl);

        //appending repo container to the DOM
        repoContEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);