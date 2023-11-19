import { API_BASE_URL } from "../utils/constants";
const baseUrl = `${API_BASE_URL}/movies`;

export const getAll = async () => {
    const response = await fetch(baseUrl+"?sortBy=createdAt desc");
    const result = await response.json();

    const data = Object.values(result);

    return data;
};

export const getOne = async (movieId) => {
    const response = await fetch(`${baseUrl}/${movieId}`);
    const result = await response.json();

    return result;
};