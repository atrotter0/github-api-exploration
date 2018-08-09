export class UserData {
  constructor(username) {
    this.username = username;
    this.commitCount = 0;
    this.pageCount = 1;
    this.followersList = [];
    this.positionInList = 0;
    this.lastUserPage = false;
    this.lastCommitPage = false;
  }

  createFollowersList(response) {
    let parsed = JSON.parse(response);
    if (this.onLastUserPage(parsed)) {
      this.lastUserPage = true;
      return;
    }

    if (!this.lastUserPage) {
      for(let i = 0; i < parsed.length; i++) {
        this.followersList.push(parsed[i].login);
      }
      this.pageCount++;
    }
  }

  countCommits(response) {
    let parsed = JSON.parse(response);
    let count = 0;

    if (this.onLastCommitPage(parsed)) {
      this.lastCommitPage = true;
      return;
    }

    for(let i = 0; i < parsed.length; i++) {
      if (parsed[i].type == 'PushEvent') {
        count += parsed[i].payload.commits.length;
      }
    }
    this.commitCount += count;
    this.pageCount++;
  }

  onLastUserPage(parsed) {
    return (parsed[0] == undefined);
  }

  onLastCommitPage(parsed) {
    return (parsed.length < this.maxCommitsPerPage());
  }

  maxCommitsPerPage() {
    const commitsPerPage = 30;
    return commitsPerPage;
  }
}
