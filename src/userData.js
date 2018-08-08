import { ApiCall } from './apiCall';

export class UserData {
  constructor(username) {
    this.username = username;
    this.commitCount = 0;
  }

  getCommits() {
    const url = `https://api.github.com/users/${this.username}/events?per_page=100`;
    let promise = ApiCall.request(url);
    promise.then((response) => {
      this.countAndParse(response);
    }, (error) => {
      console.log(error.message);
    });
  }

  countAndParse(response) {
    let parsed = JSON.parse(response);
    let count = 0;
    for(let i = 0; i < parsed.length; i++) {
      if (parsed[i].type == 'PushEvent') {
        count += parsed[i].payload.commits.length;
        //count++;
      }
    }
    console.log(parsed);
    console.log(count);
    this.commitCount = count;
  }
}
