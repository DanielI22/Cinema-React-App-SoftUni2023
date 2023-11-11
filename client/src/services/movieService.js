const baseUrl = 'http://localhost:3030/jsonstore/movies';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    const data = Object.values(result);

    return data;
};

export const getOne = async (movieId) => {
    const response = await fetch(`${baseUrl}/${movieId}`);
    const result = await response.json();

    return result;
};