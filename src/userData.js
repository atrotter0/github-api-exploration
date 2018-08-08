import { ApiCall } from './apiCall';

export class UserData {
  constructor(username) {
    this.username = username;
    this.commitCount = 0;
    this.pagesCount = 1;
    this.followers = [];
  }

  // getData(route) {
  //   const url = `https://api.github.com/users/${this.username}/${route}?page=${this.pagesCount}`;
  //   let promise = ApiCall.request(url);
  //   console.log("kevin was here");
  //   promise.then((response) => {
  //     this.getDataForRoute(route, response);
  //   }, (error) => {
  //     console.log(error.message);
  //     this.pagesCount = 1;
  //   });
  // }

  getCommitCount() {
    const url = `https://api.github.com/users/${this.username}/events?page=${this.pagesCount}`;
    let promise = ApiCall.request(url);
    promise.then((response) => {
      this.parseAndCount(response);
    }, (error) => {
      console.log(error.message);
      this.pagesCount = 1;
    });
  }

  getFollowing() {
    const url = `https://api.github.com/users/${this.username}/following?page=${this.pagesCount}`;
    let promise = ApiCall.request(url);
    promise.then((response) => {
      this.parseAndPush(response);
    }, (error) => {
      console.log(error.message);
      this.pagesCount = 1;
    });
  }

  // getDataForRoute(route, response) {
  //   if (route == "events") {
  //     this.countAndParse(response);
  //   } else if (route == "following") {
  //     this.retrieveFollowers(response);
  //   }
  // }

  parseAndCount(response) {
    let parsed = JSON.parse(response);
    let count = 0;
    for(let i = 0; i < parsed.length; i++) {
      if (parsed[i].type == 'PushEvent') {
        count += parsed[i].payload.commits.length;
      }
    }
    console.log(this.commitCount);
    this.commitCount += count;
    this.pagesCount++;
    this.getCommitCount();
  }

  parseAndPush(response) {
    let parsed = JSON.parse(response);
    for(let i = 0; i < parsed.length; i++) {
      this.followers.push(parsed[i].login);
    }
    console.log(this.followers);
    this.pagesCount++;
    this.getFollowing();
  }

  // resetPageCount(length) {
  //   if (length < 30) this.pagesCount = 1;
  // }


}
