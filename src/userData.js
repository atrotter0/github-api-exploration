export class UserData {
  constructor(username) {
    this.username = username;
    this.commitCount = 0;
    this.pagesCount = 1;
    this.following = [];
  }

  parseAndCount(response) {
    let parsed = JSON.parse(response);
    let count = 0;
    for(let i = 0; i < parsed.length; i++) {
      if (parsed[i].type == 'PushEvent') {
        count += parsed[i].payload.commits.length;
      }
    }
    this.commitCount += count;
    this.pagesCount++;
    this.getCommitCount();
    console.log(this.username + "'s Commit Count: " + this.commitCount);
  }

  parseAndPush(response) {
    let parsed = JSON.parse(response);
    if (this.onLastPage(parsed)) return;

    for(let i = 0; i < parsed.length; i++) {
      this.following.push(parsed[i].login);
    }
    this.pagesCount++;
    this.getFollowing();
    console.log("Following: " + this.following);
    console.log("Page Count: " + this.pagesCount);
  }

  onLastPage(parsed) {
    return (parsed[0] == undefined);
  }
}
