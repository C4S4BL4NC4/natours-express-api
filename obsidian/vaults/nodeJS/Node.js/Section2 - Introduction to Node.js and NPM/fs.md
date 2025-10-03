[[Node Farm]]

A  NodeJs Module to interact with the  files system here is couple methods

`const fs = require("fs"); // To import a library into the codebase
`
- ### **To Create/Overwrite text content of a file**
`fs.writeFileSync('path', 'Text'); // Write text into a file` 

==**(IT ALSO CAN CREATE A NEW FILE SPECIFIED IN PATH)(IT OVERWRITES THE CONTENT OF A FILE DOESN'T APPEND)**==

- ### To Read files asynchronously:
`fs.readFile(path, textEncoding<utf-8>, callback(err, data));`
*in **NodeJs** the first call of a callback most of the time would be error then  data.*

 - ## **To Create/Overwrite text content of a file**
 `fs.writeFile("./txt/final.txt", `${data2} \n ${data3}`, "utf-8", (err) => {console.log("File Written...");}`
