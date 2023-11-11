import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './ReviewList.module.css';

export default function ReviewList({ reviews, onDeleteReview }) {
    return (
        <div className={styles.reviewList}>
            {reviews.map(review => (
                <div key={review.id} className={styles.review}>
                    <p className={styles.author}>{review.author}</p>
                    <p className={styles.content}>{review.content}</p>
                    <button onClick={() => onDeleteReview(review.id)} className={styles.deleteButton}>
                        <FontAwesomeIcon icon={faTrashAlt} color="red" />
                    </button>
                </div>
            ))}
        </div>
    );
}
