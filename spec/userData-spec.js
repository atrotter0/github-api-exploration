import { UserData } from './../src/userData';

describe('UserData', function() {

  it('should retrieve some sort of data', function() {
    const user = new UserData('luandavidn');
    let o = user.getCommits();
    expect(o).toEqual(0);
  });

});
