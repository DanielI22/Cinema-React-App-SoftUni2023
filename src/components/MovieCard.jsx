import styles from './MovieCard.module.css';

export default function MovieCard({
    title, 
    genre, 
    posterURL, 
    onClick}) {
    return (
        <div className={styles.movieCard} onClick={onClick}>
          <img src={posterURL} alt={title} className={styles.poster} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.genre}>{genre}</p>
        </div>
      );
}