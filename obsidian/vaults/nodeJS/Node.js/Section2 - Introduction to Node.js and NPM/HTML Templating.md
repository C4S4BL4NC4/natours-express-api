[[Node Farm]]

### Placeholders:

Placeholders in the HTML can be anything. But preferably a something that is not within the file itself e.g. `{%PRODUCTNAME%}`

### Filling out the template:

Mainly replacing the custom parameters we choose to set in the HTML file using the `String.replace()` method, with the global modified to select all instances `String.replace(/'word'/g , 'toBeReplacedWith')`

### Parsing the query:

Done with `url.parse(req.url, true)` true for if the url has a query.

