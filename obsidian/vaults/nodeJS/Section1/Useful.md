[[Node.js]]

#### Fetch: 

```
const superagent = require("superagent");
superagent.get(apiLink).end((err, res) => { // Fun Body})
```

#### Promises: 

```
const fs = require('fs');

const superagent = require('superagent');

  

function readFileProm(file) {

return new Promise((resolve, reject) => {

fs.readFile(file, (err, data) => {

if (err) reject('File Not Found!');

resolve(data);

});

});

}

  

function writeFileProm(file, data) {

return new Promise((resolve, reject) => {

fs.writeFile(file, data, (err) => {

if (err) reject("Can't Write File!");

resolve('Success');

});

});

}

  

const getDogPic = async () => {

try {

const dogBreed = await readFileProm(`${__dirname}/dog.txt`);

console.log(`Breed: ${dogBreed}`);

  

const dogResponse = await superagent.get(

`https://dog.ceo/api/breed/${dogBreed}/images/random`

);

  

await writeFileProm('dog-img.txt', '' + dogResponse.body.message);

} catch (err) {

console.log(`💥 ${err} 💥`);

throw err;

}

return 'DOGGO'; // To get this string you need to make an iife

};

  

(async () => {

try {

console.log(`1: Will get Dog Pics`);

const x = await getDogPic();

console.log(`2: Done getting pics`);

console.log(x);

} catch (err) {

console.log(err, '💥');

}

})();
```

Run promises simultaneously `Promise.all([arrayOfPromises])`