[[Express Framework]]

We can define a variable in the URL using `:` e.g. `'/api/v1/tours/:id'` in this case the `id` is the variable.  You can also chain  variables together such as `/api/v1/tours/:x:y:z` the URL would look like `/api/v1/tours/123`and these variables get stored as an #Object in `req.params` resulting `{x : '1', y: '2', z: '3' }`.

Adding a question mark at the end of a parameter makes it `OPTIONAL` e.g. `'/api/v1/tours/:id/:abc?'` Leaving an optional parameter empty results in an `undefined` in the result.


