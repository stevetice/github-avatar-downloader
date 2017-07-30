const request = require('request');
const fs = require('fs');
require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');

const repoOwner = process.argv[2];
const repoName = process.argv[3];


// Uses avatar_url as input to get the images, and the filepath as location to save the output
function downloadImageByURL(url, filePath) {
  // Send the GET request
  request.get(url)
    .on('error', function (err) {
      throw console.log("That didn't work", err);
    })
    // Console.log the status code of the response
    .on('response', function (response) {
      console.log("Response status code: ", response.statusCode);
    })
    // Pipe the response to the output filepath
    .pipe(fs.createWriteStream(filePath));
}


function getRepoContributors(repoOwner, repoName, cb) {
  const user = process.env.GITHUB_USER;
  const token = process.env.GITHUB_TOKEN;
  const requestURL = 'https://' + user + ':' + token + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  const userOptions = {
    headers: {
      'User-Agent': 'Crazy Terry'
    }
  };

  // Make an http GET request to generated URL
  request(requestURL, userOptions, function (err, response, body) {
    try {
      // Parse the request response
      const data = JSON.parse(body);
      // For each user in data
      data.forEach(function(user) {
        // console.log the username & avatar_url
        console.log("user: avatar_url", user.login, ": ", user.avatar_url);
        // Call downloadImageByURL with the avatar_url, filepath
        // filepath is constructed using folder name. Image filename is created using user login name and .jpg
        downloadImageByURL(user.avatar_url, "avatars/" + user.login + ".jpg");
      });
    } catch (err) {
      console.log('Failed to parse content body');
    }
  });
}

// Will not run if either repoOwner or repoName are undefined
if (repoOwner === undefined || repoName === undefined) {
  console.log("Need to enter both repo owner and reponame.");
  console.log("Enter as: node avatars.js <repoOwner> <repoName>");
} else {
  // Call the getRepoContributorsFunction
  getRepoContributors(repoOwner, repoName, function(err, result) {
    console.log("Errors: ", err);
    let resultObj = JSON.parse(result.body);
  });
}
