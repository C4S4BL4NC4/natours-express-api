/* eslint-disable */

import { login } from './login.mjs';
import { displayMap } from './mapbox.mjs';

const mapBox = document.getElementById('map');
console.log(mapBox);
const loginForm = document.querySelector('.form');
console.log(loginForm);
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
