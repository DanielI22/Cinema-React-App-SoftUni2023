import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>ReactCineX © {new Date().getFullYear()}</p>
        </footer>
    );
}