"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
class RoomManager {
    // Need to provide all possible rooms when creating a new manager
    constructor(allRooms) {
        this.allRooms = allRooms;
        this.roomsBooked = new Map();
    }
    // Attempts to book a room and returns true if it was successful, false otherwise
    bookRoom(date, room, person) {
        // If no rooms have been booked for this date yet, then add a new map with this current booking
        const dateString = date.toString();
        if (!this.roomsBooked.has(dateString)) {
            this.roomsBooked.set(dateString, new Map([[room, person]]));
            return true;
        }
        // Handling undefined is easy here so we do it even though we check right above that the key exists
        const bookedRooms = this.roomsBooked.get(dateString);
        if (bookedRooms == null || bookedRooms.has(room)) {
            // Room is already booked and can't be booked again (even by the same person)
            return false;
        }
        bookedRooms.set(room, person);
        return true;
    }
    // Returns a list of available rooms for a given date
    checkAvailability(date) {
        const dateString = date.toString();
        // If there is no entry for this date in the bookings map, then all rooms are available
        const bookedRooms = this.roomsBooked.get(dateString);
        if (bookedRooms == null) {
            return this.allRooms;
        }
        return this.allRooms.filter((element) => !bookedRooms.has(element));
    }
}
exports.RoomManager = RoomManager;
