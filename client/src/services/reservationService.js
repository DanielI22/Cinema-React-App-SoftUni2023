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