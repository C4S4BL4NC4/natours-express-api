[[Node.js]]

#### The REST Architecture:
1.  Separate API into logical **resources**.
	**Resource**: Object or representation of something, which has data associated to it. Any information that can be **named** can be a resource. 
	e.g. '' tours, users, reviews''
	`https://natours.com/addNewTour` this "addNewTour" #endpoint is bad because it avoid rule 3. Instead use the `GET` method of the http methods.


2. Expose structured, **resource-based URLS**.

3. Use **HTTP methods** (verbs).

| Bad Practice | Http Method       | Endpoint | Functions (CRUD) |
| ------------ | ----------------- | -------- | ---------------- |
| /addNewTour  | ==POST==          | /tours   | Create           |
| /getTour     | ==GET==           | /tours/7 | Read             |
| /updateTour  | ==PUT== ==PATCH== | /tours/7 | Update           |
| /deleteTour  | ==DELETE==        | /tours/7 | Delete           |

4. Send data as **JSON** (usually).[^1]

5. Be **stateless**.
	Examples of state: `loggedIn` `currentPage`

[^1]: JSON Keys must be a **STRING**. Sometime the values too.


