import { UserData } from './userData';
import { ApiCall } from './apiCall';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function getData() {
  const page = 1;
  const user = new UserData('atrotter0');
  getFollowerData(user, page);
}

function getFollowerData(user, page) {
  const url = `https://api.github.com/users/${user.username}/following?page=${page}`;
  let promise = ApiCall.makeRequest(url);

  promise.then((response) => {
    user.createFollowersList(response);
    checkLastPage(user);
  }, (error) => {
    console.log(error.message);
    user.pageCount = 1; //remove this?
  });
}

function checkLastPage(user) {
  console.log("user last page: " + user.pageCount);
  if (user.lastUserPage === true) {
    console.log("got all users!");
    //getCommitCount(user.followersList, 0, 1);
  } else {
    getFollowerData(user.pageCount);
  }
  console.log(user.followersList);
}

function getCommitCount(usernameList, iterator, page) {
  let user = new UserData(usernameList[iterator]);
  const url = `https://api.github.com/users/${user.username}/events?page=${page}`;
  let promise = ApiCall.request(url);

  promise.then((response) => {
    user.countCommits(response);
    if (user.lastCommitPage) {
      iterator++;
      page = 1;
      getCommitCount(usernameList, iterator, page);
    } else {
      page++;
      getCommitCount(usernameList, iterator, page);
    }
  }, (error) => {
    console.log(error.message);
    user.pageCount = 1; //remove this?
  });
}

function displayData() {

}

$(document).ready(function() {
  getData();
});
