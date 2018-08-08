import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { UserData } from './userData';

$(function() {
  const user = new UserData('luandavidn');
  user.getCommits();
  console.log(user);
});
