export class RoomManager {
    // All the possible rooms that are in our building? office? place?
    allRooms: string[];

    // Stores all of the bookings that have been made for a date, then a room
    // Key: date as a string, value: Map of rooms booked (key) to the person who booked it (value)
    roomsBooked: Map<string, Map<string , string>>;

    // Need to provide all possible rooms when creating a new manager
    constructor(allRooms: string[]) {
        this.allRooms = allRooms;
        this.roomsBooked = new Map<string, Map<string , string>>();
    }

    // Attempts to book a room and returns true if it was successful, false otherwise
    bookRoom(date: Date, room: string, person: string) : boolean {
        // If no rooms have been booked for this date yet, then add a new map with this current booking
        const dateString : string = date.toString();
        if(!this.roomsBooked.has(dateString)) {
            this.roomsBooked.set(dateString, new Map<string , string>([[room, person]]));
            return true;
        }
        // Handling undefined is easy here so we do it even though we check right above that the key exists
        const bookedRooms : Map<string, string> | undefined = this.roomsBooked.get(dateString);
        if(bookedRooms == null || bookedRooms.has(room)) {
            // Room is already booked and can't be booked again (even by the same person)
            return false;
        }
        bookedRooms.set(room, person);
        return true;
    }

    // Returns a list of available rooms for a given date
    checkAvailability(date: Date) : string[] {
        const dateString : string = date.toString();
        // If there is no entry for this date in the bookings map, then all rooms are available
        const bookedRooms : Map<string, string> | undefined = this.roomsBooked.get(dateString);
        if(bookedRooms == null) {
            return this.allRooms;
        }
        return this.allRooms.filter((element : string) => !bookedRooms.has(element));
    }
}