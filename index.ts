import express, {Express, Request, Response} from "express";
import {BookRequest, BookResponse, AvailabilityResponse} from "./RequestResponseTypes";
import {RoomManager} from "./RoomManager";
import bodyParser from "body-parser";

// Create web server, define all possible rooms, and create the room manager
const app: Express = express();
const allRooms : string[] = ["A", "B", "C", "D"];
const roomManager : RoomManager = new RoomManager(allRooms);

const availability_endpoint_path : string = '/rooms/availability/:date';
const book_endpoint_path : string = '/rooms/book';

// This is the availability endpoint. Parse the date from the url path and get availability from room manager, then format for output
app.get(availability_endpoint_path, (request, response: Response<AvailabilityResponse>) => {
    // Our date format is YYYY_MM_DD but date class uses "-" so we replace the underscores with hyphens
    const rawDate : string = request.params.date.replaceAll("_", "-");

    // If the input date is not valid then return a "Bad request" error code and send them an error message
    const date : Date = new Date(rawDate);
    if(date.toString() === 'Invalid Date') {
        response.status(400);
        response.send({error: 'Invalid Date'});
        return;
    }

    // Room manager tells us what rooms are available and we format that into a json response
    const availableRooms : string[] = roomManager.checkAvailability(date);
    response.status(200);
    response.send({availableRooms: availableRooms});
})

// We need to create a json parser to parse the input body of the post request
const jsonParser = bodyParser.json()
app.post(book_endpoint_path, jsonParser, (request : Request<any, any, BookRequest>  , response:  Response<BookResponse>) => {
    // Our date format is YYYY_MM_DD but date class uses "-" so we replace the underscores with hyphens
    const rawDate : string = request.body.date.replaceAll("_", "-");

    // If the input date is not valid then return a "Bad request" error code and set success to false
    const date : Date = new Date(rawDate);
    if(date.toString() === 'Invalid Date') {
        response.status(400);
        response.send({success: false});
        return;
    }

    // Room manager tells us if a room was booked, we format that into a json reponse
    const success : boolean = roomManager.bookRoom(date, request.body.room, request.body.person);
    response.status(200);
    response.send({success: success});
})

// Launch the express web server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on "+port))
