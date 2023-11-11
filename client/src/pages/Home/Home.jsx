import styles from './Home.module.css'
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className={styles.welcomeTitle}>Welcome to ReactCineX</h1>
      <p className={styles.welcomeDescription}>
        Discover some of the best movies and book your reservations.
      </p>

      <h2 className={styles.upcomingShowingsTitle}>Upcoming Showings</h2>

      <MovieCarousel />
     
    </div>
  );
}