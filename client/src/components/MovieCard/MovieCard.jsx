import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import { genreToString } from '../../services/utils';
export default function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <Link to={`/movies/${movie._id}`} className={styles.card}>
        <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
        <div className={styles.info}>
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.genre}>{genreToString(movie.genre)}</p>
        </div>
      </Link>
    </div>
  );
}