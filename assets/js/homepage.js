var userFormEl = document.querySelector("#user-form");
var userInputEl = document.querySelector("#username");

var getUserRepos = function(user) {
    
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });

    
};

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

userFormEl.addEventListener("submit", formSubmitHandler);