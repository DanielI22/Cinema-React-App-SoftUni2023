import { API_BASE_URL } from "../utils/constants";
import * as request from "../lib/request"

const baseUrl = `${API_BASE_URL}/movies`;

export const getAll = async () => {
    const result = await request.get(baseUrl);
    return result;
};

export const getOne = async (movieId) => {
    const result = await request.get(`${baseUrl}/${movieId}`)
    return result;
};