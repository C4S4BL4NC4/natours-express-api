/*
THIS IS LEFT BEHIND BECAUSE I FIGURED YOU CAN DO SCRIPTING IN POSTMAN ITSELF
*/

const fs = require('fs');
// const dotenv = require("dotenv");

const firstName = fs
  .readFileSync(`${__dirname}/wordlists/names/firstName.txt`, 'utf-8')
  .split('\r\n');
const lastName = fs
  .readFileSync(`${__dirname}/wordlists/names/lastName.txt`, 'utf-8')
  .split('\r\n');
const passwords = fs
  .readFileSync(`${__dirname}/wordlists/passwords/passwords.txt`, 'utf-8')
  .split('\r\n');

exports.getName = function () {
  return `${firstName[Math.floor(Math.random() * firstName.length)]} ${
    lastName[Math.floor(Math.random() * firstName.length)]
  }`;
};

exports.getPassword = function () {
  return `${passwords[Math.floor(Math.random() * passwords.length)]}`;
};

exports.getEmail = function (name) {
  return [
    `${name}@${
      ['gmail', 'yahoo', 'hotmail', 'outlook'][Math.floor(Math.random() * 4)]
    }.com`,
  ];
};

exports.signLoginArr = function () {
  const name = this.getName();
  const email = this.getEmail(name.split(' ').join('').toLowerCase());
  const password = this.getPassword();
  const passwordConfirm = password;
  return [
    {
      name,
      email,
      password,
      passwordConfirm,
    },
    {
      email,
      password,
    },
  ];
};

exports.testTour = function () {
  const name = `${this.getName()} Tour`;
  const duration = Math.floor(Math.random() * 14);
  const maxGroupSize = Math.floor(Math.random() * 10);
  const difficulty = ['easy', 'medium', 'difficult'][
    Math.floor(Math.random() * 3)
  ];
  const price = Math.floor(400 + Math.random() * 1000);
  const summary = `${name} Tour Summary`;
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm…';
  const imageCover = `${name.split(' ').join('').toLowerCase}.jpg`;
  return {
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    summary,
    description,
    imageCover,
  };
};
