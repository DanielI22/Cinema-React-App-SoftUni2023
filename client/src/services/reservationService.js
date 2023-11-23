import { API_BASE_URL } from "../utils/constants";
const baseUrl = `${API_BASE_URL}/reservations`;

export const addReservation = async (reservationData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    });

    if (response.status==401) {
        throw new Error('Unauthorized')
    }
    if (!response.ok) {
        throw new Error('Failed to create reservation');
    }

    const result = await response.json();
    return result;
};

export const GetMovieSeats = async (movieId) => {
    const response = await fetch(`${baseUrl}?where=movieId%3D"${movieId}"`);
    const reservations = await response.json();

    return reservations.reduce((acc, reservation) => {
        if (reservation.seats && Array.isArray(reservation.seats)) {
            return acc.concat(reservation.seats);
        }
        return acc;
    }, []);
}