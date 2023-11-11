import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/"><img className={styles.logo} src="/logo.png" alt="ReactCineX" /></Link>
            <div className={styles.navLeft}>
                <Link to="/movies">Our Movies</Link>
            </div>
            <div className={styles.navRight}>
                <div className={styles.profileDropdown}>
                    <button className={styles.profileButton}>My Profile</button>
                    <div className={styles.dropdownContent}>
                        <Link to="/reservations">Reservations</Link>
                        <Link to="/favourites">Favourites</Link>
                    </div>
                </div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/logout">Log out</Link>
            </div>
        </header>
    );
}
