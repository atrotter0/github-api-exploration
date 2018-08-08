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
      let body = JSON.parse(response);
      console.log(body + "xxxx" + body.length);
      return body;
    }, (error) => {
      console.log(error.message);
    });
  }

}
