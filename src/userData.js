import { ApiCall } from './apiCall';

export class UserData {
  constructor(username) {
    this.username = username;
    this.commitCount = 0;
    this.pagesCount = 1;
  }

  getCommits() {
    const url = `https://api.github.com/users/${this.username}/events?per_page=100?page=${this.pagesCount}`;
    let promise = ApiCall.request(url);
    promise.then((response) => {
      this.countAndParse(response);
    }, (error) => {
      console.log(error.message);
    });
  }

  countAndParse(response) {
    let parsed = JSON.parse(response);
    console.log("parsed length: " + parsed.length);
    console.log(response);
    let count = 0;
    for(let i = 0; i < parsed.length; i++) {
      if (parsed[i].type == 'PushEvent') {
        count += parsed[i].payload.commits.length;
      }
    }
    this.commitCount += count;
    if (parsed.length == 100) {
      this.pagesCount++;
      this.getCommits();
    }

  }
}
