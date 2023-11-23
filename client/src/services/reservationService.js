import { API_BASE_URL } from "../utils/constants";
import * as request from "../lib/request"

const baseUrl = `${API_BASE_URL}/reservations`;

export const addReservation = async (reservationData) => {
    await request.post(baseUrl, reservationData);
};

export const GetMovieSeats = async (movieId) => {
    const result = await request.get(`${baseUrl}?where=movieId%3D"${movieId}"`);

    return result.reduce((acc, reservation) => {
        if (reservation.seats && Array.isArray(reservation.seats)) {
            return acc.concat(reservation.seats);
        }
        return acc;
    }, []);
}