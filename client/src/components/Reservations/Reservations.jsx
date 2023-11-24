import { useState, useEffect, useContext } from 'react';
import * as reservationService from '../../services/reservationService';
import ReservationTicket from '../ReservationTicket/ReservationTicket';
import Spinner from '../Spinner/Spinner';
import styles from './Reservations.module.css';
import AuthContext from '../../contexts/authContext';
import { toast } from 'react-toastify';
import DeleteModal from '../DeleteModal/DeleteModal';
import { RESERVATIONS_PER_PAGE } from '../../utils/constants';

export default function Reservations() {
    const { userId } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(RESERVATIONS_PER_PAGE);

    useEffect(() => {
        setIsLoading(true);
        reservationService.getReservations(userId)
            .then(resData => {
                setReservations(resData);
                setIsLoading(false);
            })
            .catch(error => {
                toast.error(error);
                setIsLoading(false);
            });
    }, [userId]);

    const openDeleteModal = (reservationId) => {
        setShowDeleteModal(true);
        setSelectedReservationId(reservationId);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedReservationId(null);
    };

    const onCancelReservation = () => {
        if (selectedReservationId) {
            reservationService.deleteReservation(selectedReservationId)
                .then(() => {
                    setReservations(reservations.filter(reservation => reservation._id !== selectedReservationId));
                    toast.success('Reservation cancelled successfully');
                })
                .catch(error => toast.error(error));
        }
        closeDeleteModal();
        setCurrentPage(1);
    };


    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);
    const totalPages = Math.ceil(reservations.length / reservationsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.reservationsPage}>
            <h1 className={styles.title}>Your Reservations</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                reservations.length === 0 ? (
                    <p className={styles.noReservations}>You have no reservations.</p>
                ) : (
                    <div className={styles.reservationsList}>
                        {currentReservations.map(reservation => (
                            <ReservationTicket key={reservation._id} reservation={reservation} onCancelClick={openDeleteModal} />
                        ))}
                        <DeleteModal
                            showModal={showDeleteModal}
                            onConfirm={() => onCancelReservation()}
                            onCancel={closeDeleteModal}
                        />
                        <nav>
                            <ul className={styles.pagination}>
                                {pageNumbers.map(number => (
                                    <li key={number} className={styles.pageItem}>
                                        <a
                                            onClick={() => setCurrentPage(number)}
                                            className={`${styles.pageLink} ${number === currentPage ? styles.currentPageLink : ''}`}
                                        >
                                            {number}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )
            )}
        </div>
    );
}