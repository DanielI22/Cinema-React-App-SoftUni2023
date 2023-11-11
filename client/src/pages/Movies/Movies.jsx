import { useEffect, useState } from "react";
import * as movieService from "../../services/movieService";
import styles from "./Movies.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        movieService.getAll()
            .then(result => setMovies(result))
            .catch(err => console.log(err))
    }, []);
    
    return(
        <div className={styles.moviesContainer}>
        {movies.map(movie => (
            <MovieCard 
                key={movie._id} 
                movie={{...movie}} 
            />
        ))}
    </div>)
}