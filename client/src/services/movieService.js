import { API_BASE_URL } from "../utils/constants";
import * as request from "../lib/request"

const baseUrl = `${API_BASE_URL}/movies`;

export const getAll = async () => {
    const result = await request.get(`${baseUrl}?sortBy=createdAt%20desc`);
    return result;
};

export const getOne = async (movieId) => {
    const result = await request.get(`${baseUrl}/${movieId}`)
    return result;
};

export const deleteMovie = async (movieId) => {
    await request.remove(`${baseUrl}/${movieId}`);
}

export const editMovie = async (movieId, movieData) => {
    const result = await request.put(`${baseUrl}/${movieId}`, movieData);
    return result;
};