import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const {
        isAuthenticated,
        username,
    } = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <Link to={PATHS.HOME}><img className={styles.logo} src="/logo.png" alt="ReactCineX" /></Link>
            <div className={styles.navLeft}>
                <Link to={PATHS.MOVIES}>Our Movies</Link>
            </div>
            <div className={styles.navRight}>
                {isAuthenticated ? (
                    <>
                        <div className={styles.profileDropdown}>
                            <button className={styles.profileButton}>
                                {username} <FontAwesomeIcon icon={faCaretDown} />
                            </button>
                            <div className={styles.dropdownContent}>
                                <Link to="/reservations">Reservations</Link>
                                <Link to="/favourites">Favourites</Link>
                            </div>
                        </div>
                        <Link to={PATHS.LOGOUT}>Log out</Link>
                    </>
                ) : (
                    <>
                        <Link to={PATHS.LOGIN}>Login</Link>
                        <Link to={PATHS.REGISTER}>Register</Link>
                    </>
                )}
            </div>
        </header>
    );
}
