var issuesContEl = document.querySelector("#issues-container");
var limitEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
   
    fetch(apiUrl).then(function(response) {

        if (response.ok) {
            response.json().then(function(data){
            
                displayIssues(data);

                if(response.headers.get("link")) {
                    displayWarning(repo)
                }
            
            })
        } else {
            alert("There was a problem with your request. Please try again.");
        }
    })
    
    
}

var displayIssues = function(issues) {

    if (issues.length === 0) {
        issuesContEl.textContent = "There are no issues in this Repository";
        return;
    }

    for (var i=0; i<issues.length; i++) {
        //creating elements that link to git issue 
        var issuesEl = document.createElement("a");

        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target","_blank" );
        //title of issue
        var issueTitle = document.createElement("span");
        issueTitle.textContent = issues[i].title;

        issuesEl.appendChild(issueTitle);
        //Type of issue
        var issueType = document.createElement("span");
        
        if (issues[i].pull_request) {
            issueType.textContent = "(Pull request)"
        } else {
            issueType.textContent = "(Issue)";
        }
        issuesEl.appendChild(issueType);

        issuesContEl.appendChild(issuesEl);
        
    }

}

var displayWarning = function(repo) {

    limitEl.textContent = "There are more than 30 issues. To see more,  "
    var linkEl = document.createElement("a");
    linkEl.textContent = "visit GitHub.com"
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitEl.appendChild(linkEl);
}

getRepoIssues("facebook/react");