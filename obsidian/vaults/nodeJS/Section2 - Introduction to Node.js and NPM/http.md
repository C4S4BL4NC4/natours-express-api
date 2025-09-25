[[Node Farm]]

A  Module to used to interact with the web SENDING GET AND POST requests.

### Import the library:

`const http = require("http");`

### **Create a server:**

```
const server = http.createServer((req, res) => {
res.end("Hello from Server!"); 
});
```
- *==Sending back a plain text simple response.==*

### Listen To Requests:
```
server.listen(8000, "127.0.0.1", () => {
console.log("Server Has Started listening to req ons port 8000");
});
```
- ==*Listen to requests on Port(8000), IP(127.0.0.1 localhost), callback that executes when listen is executed*==

