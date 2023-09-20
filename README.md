# READ ME

## Approach

I am going to use bullet points to outline my approach. They are given below:

* Chose to use express due to the ease to setup and because of the small size of this project
* Chose to handle the endpoints in index.ts due to their simplicity
* Created a separate class to handle all the business logic of actually managing room availability
  * This class allows an endpoint to be easily added to display who has booked which rooms as well
* Chose to handle the parsing/formatting of the request/response objects inside index.ts due to their simplicity
* Created types for the Request/Response schemas to prove that I know how to use Typescript over Javascript ;)
* Didn't explicitly type every single const declaration on purpose, some of them (like the json parser from the library) have long types that don't add useful information
  * Sometimes it improves readability to spell out the type of certain variables
* Used status codes for success and bad request


## How to run
1. Install npm, node, and this repo.
2. Run `npm run start` from this repo
3. Make requests to the `/rooms/book` and `/rooms/availability` endpoints
   4. Example curl commands plus the and response schemas are given below

## Endpoints

### Book endpoint

Make your POST requests to the `/rooms/book` endpoint. Example: `http://localhost:3000/rooms/book`

#### Request
The request body json should have the following schema:

```json
{
  "date": "YYYY_MM_DD",
  "room": "<A | B | C | D>",
  "person": "<Jane | Sarah | John>"
}
```

#### Response
The response body json will have the following schema:

```json
{
  "success": "<true | false>"
}
```

### Availability endpoint

Make your GET requests to the `/rooms/availability/YYYY_MM_DD` endpoint where the date is what date you want room availability for. Example: `http://localhost:3000/rooms/availability/2024_10_01`

#### Response
The response body json will have the following schema:

If there is an error, the "availableRooms" field will be omitted and the "error" field will contain the error message.
If there is no error, the "error" field will be omitted and "availableRooms" will be a list of available room names.

```json
{
  "availableRooms": [""],
  "error": ""
}
```

### Example Curl Commands
* Book the rooms (example data is from project prompt):
  * `curl  -H "Content-Type: application/json" -d "{\"date\": \"2024_10_01\", \"room\": \"A\", \"person\": \"Jane\"}" http://localhost:3000/rooms/book`
  * `curl  -H "Content-Type: application/json" -d "{\"date\": \"2024_10_02\", \"room\": \"A\", \"person\": \"Jane\"}" http://localhost:3000/rooms/book`
  * `curl  -H "Content-Type: application/json" -d "{\"date\": \"2024_10_01\", \"room\": \"B\", \"person\": \"Sarah\"}" http://localhost:3000/rooms/book`
  * `curl  -H "Content-Type: application/json" -d "{\"date\": \"2024_10_02\", \"room\": \"C\", \"person\": \"John\"}" http://localhost:3000/rooms/book`
* Check availability on the date (example dates from the project prompt):
  * `curl http://localhost:3000/rooms/availability/2024_10_01 -H "Accept: application/json" `
  * `curl http://localhost:3000/rooms/availability/2024_10_02 -H "Accept: application/json" `
  * `curl http://localhost:3000/rooms/availability/2024_10_03 -H "Accept: application/json" `