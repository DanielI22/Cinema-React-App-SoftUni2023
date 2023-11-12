import { useEffect, useState } from "react";
import * as movieService from "../../services/movieService";
import styles from "./Movies.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        movieService.getAll()
            .then(result => setMovies(result))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        setGenres(getDistinctGenres(movies))
    }, [movies])

    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGenre === '' || movie.genre.includes(selectedGenre));
    });

    return (
        <div className={styles.containterTest}>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <select
                    value={selectedGenre}
                    onChange={(e) => {setSelectedGenre(e.target.value); setSearchQuery('')}}
                    className={styles.genreSelect}
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            {filteredMovies.length > 0 ? <div className={styles.moviesContainer}>
                {filteredMovies.map(movie => (
                    <MovieCard
                        key={movie._id}
                        movie={{ ...movie }}
                    />
                ))}
            </div> : <div className={styles.noMovies}>No movies match your criteria</div>}
        </div>)
}

function getDistinctGenres(movies) {
    const allGenres = movies.map(movie => movie.genre).flat();
    return Array.from(new Set(allGenres));
}