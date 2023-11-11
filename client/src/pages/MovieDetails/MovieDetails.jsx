import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import * as movieService from "../../services/movieService";
import { formatIsoDate } from "../../services/utils"
import ReviewList from '../../components/ReviewList/ReviewList';

export default function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        movieService.getOne(movieId)
            .then(result => setMovie(result))
            .catch(err => console.log(err))
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const handleSubmitReview = () => {
        // Handle the submission of the review
        console.log("Review submitted");
    };

    const reviews = [{
        id: "review1",
        author: "Jane Doe",
        content: "I loved this movie! The special effects were amazing and the storyline kept me engaged the entire time."
    }]

    return (
        <div className={styles.movieDetails}>
            <div className={styles.detailsContainer}>
                <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title} ({movie.year})</h1>
                    <p className={styles.genre}>{movie.genre}</p>
                    <p className={styles.description}>{movie.description}</p>
                    <div className={styles.favouritesContainer}>
                        <p>Add to Favourites </p>
                        <button className={styles.favouritesButton}>
                            <FontAwesomeIcon icon={faStar} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.additionalInfo}>
                <p className={styles.startTime}>Showtime - {formatIsoDate(movie.startTime)}</p>
                <ReactTooltip id="priceTooltip" place="top" effect="solid" />
                <Link to={`/movies/${movie._id}/booking`} data-tooltip-content={`Price: $${movie.price}`} data-tooltip-id="priceTooltip" className={`${styles.bookingButton}`}>
                    Book a Ticket
                </Link>
            </div>
            <div className={styles.reviewArea}>
                <textarea className={styles.reviewTextarea} placeholder="Leave a review..."></textarea>
                <button onClick={handleSubmitReview} className={styles.submitButton}>Send</button>
                <div className={styles.reviewList}>
                    <ReviewList reviews={reviews} />
                </div>
            </div>
        </div>
    );
}