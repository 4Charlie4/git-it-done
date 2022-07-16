var issuesContEl = document.querySelector("#issues-container");
var limitEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
   
    fetch(apiUrl).then(function(response) {

        if (response.ok) {
            response.json().then(function(data){
                
                displayIssues(data);

                //checks if API can't list all of the issues on page (GitHub API will only send 30 on a page)
                if(response.headers.get("link")) {
                    displayWarning(repo)
                }
            
            })
        } else {
            document.location.replace("./index.html");
        }
    })
    
    
}
//grabs the correct repo chosen
var getRepoName = function() {
    //finds and formats repo name
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    
    if (repoName) {
        //upon valid repo name chosen
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
        //returns to previous page if no valid repo
    } else {    
        document.location.replace("./index.html");
    }
    
}
//displays issues from repo  on page 
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
        //checks if the issue was pull requested or not and displays on page
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




getRepoName();