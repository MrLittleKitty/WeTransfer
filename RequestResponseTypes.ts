// Type for the request to the "/book" endpoint
export interface BookRequest {
    date: string,
    room: string,
    person: string
}

// Type for the response from the "/book" endpoint
export interface BookResponse {
    success: boolean
}

// Type for the request to the "/availability" endpoint
export interface AvailabilityResponse {
    availableRooms?: string[] | undefined,
    error?: string | undefined,
}