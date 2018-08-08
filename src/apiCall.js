export class ApiCall {
  static request(endpoint) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = endpoint;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.setRequestHeader("Authorization", `token ${process.env.github_aki_key}`);
      request.send();
    });
  }
}
