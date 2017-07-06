const request = require('request');
require('dotenv').config()
console.log('Welcome to the GitHub Avatar Downloader!');




function getRepoContributors(repoOwner, repoName, cb) {

  var user = process.env.GITHUB_USER
  var token = process.env.GITHUB_TOKEN
  var requestURL = 'https://'+ user + ':' + token + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  var userOptions = {
    url: requestURL,
    headers: {
      'User-Agent': 'Crazy Terry'
    }
  };



  function getGitHubApiResponse() {
    request(userOptions, function (error, response, body) {
      try {
        const data = JSON.parse(body);
        console.log(typeof data === 'object');
        data.forEach(function (arrayItem) {
          console.log(arrayItem.avatar_url);
        })
      } catch (err) {
        // console.log(response);
        // console.log(body);
        console.log('Failed to parse content body');
      };
    });
// getGitRepoContributors(process.argv[2], process.argv[3], function(err, result)
//   data.forEach((contributor) => {
//     console.log(contributor.login);
//   });
// });
// getGitHubApiResponse("https://api.github.com", )
// };
  };
getGitHubApiResponse();
}
getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});