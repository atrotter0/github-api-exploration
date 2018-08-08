import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { UserData } from './userData';
import { ApiCall } from './apiCall';

function getFollowing() {
  let user = new UserData('atrotter0');
  const url = `https://api.github.com/users/${user.username}/following?page=${user.pagesCount}`;
  let promise = ApiCall.request(url);

  promise.then((response) => {
    user.parseAndPush(response);
    displayAllCommits(user.following);
  }, (error) => {
    console.log(error.message);
    user.pagesCount = 1;
  });
}

function displayAllCommits(usernames) {
  usernames.forEach(function(username) {
    getCommitCount(username);
  });
}

function getCommitCount(username) {
  let user = new UserData(username);
  const url = `https://api.github.com/users/${username}/events?page=${user.pagesCount}`;
  let promise = ApiCall.request(url);

  promise.then((response) => {
    user.parseAndCount(response);
    console.log(user.username + " " + user.commitCount);
  }, (error) => {
    console.log(error.message);
    user.pagesCount = 1;
  });
}

function displayData() {

}

$(function() {
  getFollowing();
});
