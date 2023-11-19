import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import styles from './Booking.module.css';
import { useState, useEffect, useRef } from 'react';
import { TOTAL_ROWS, SEATS_PER_ROW, MAX_SEATS } from '../../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import  *  as reservationService from '../../services/reservationService'

export default function Booking() {
    const { movieId } = useParams();
    const [reservedSeats, setReservedSeats] = useState(['3E']);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const price = localStorage.getItem('selectedMoviePrice')

    useEffect(() => {
        // Fetch reserved seats from your backend and update state
        // setReservedSeats(fetchedReservedSeats);
    }, []);

    const isSeatReserved = (seatId) => reservedSeats.includes(seatId);
    const isSeatSelected = (seatId) => selectedSeats.includes(seatId);

    const handleSeatClick = (seatId) => {
        if (isSeatReserved(seatId)) return;

        setSelectedSeats((prevSelected) => {
            if (prevSelected.includes(seatId)) {
                const newSelected = prevSelected.filter(id => id !== seatId);
                setTotalPrice(newSelected.length * price);
                return newSelected;
            } else {
                if (prevSelected.length >= MAX_SEATS) {
                    showWarningToast();
                    return prevSelected;
                }
                const newSelected = [...prevSelected, seatId];
                setTotalPrice(newSelected.length * price);
                return newSelected;
            }
        });
    }

    const toastId = useRef(null);
    const showWarningToast = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.warn("You can select a maximum of 3 seats", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    const createSeatLayout = () => {
        let layout = [];
        for (let row = 0; row < TOTAL_ROWS; row++) {
            let seatRow = [];
            for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
                const seatId = `${row + 1}${String.fromCharCode(65 + seat)}`;
                seatRow.push(
                    <div
                        key={seatId}
                        className={`${styles.seat} ${isSeatReserved(seatId) ? styles.reservedSeat :
                            isSeatSelected(seatId) ? styles.selectedSeat : ''
                            }`}
                        onClick={() => handleSeatClick(seatId)}
                    >
                        <FontAwesomeIcon icon={faChair} style={{ fontSize: '30px' }} />
                    </div>
                );
            }
            layout.push(<div key={`row-${row}`} className={styles.seatRow}>{seatRow}</div>);
        }
        return layout;
    };

    const handleReservation = async () => {
        try {
            const reservationData = {
                movieId: movieId,
                userId: '456',
                seats: selectedSeats,
            };
            const result = await reservationService.addReservation(reservationData);
            console.log('Reservation successful', result);
        } catch (error) {
            toast.error('Reservation failed: ' + error.message, {
                position: "top-center",
                autoClose: false,
            });

            navigate('/');
        }
    };

    return (
        <div className={styles.bookingContainer}>
            <div className={styles.screenLabel}>Screen</div>
            <div className={styles.selectSeatsLabel}>Please select your seats</div>
            <div className={styles.seatsContainer}>
                {createSeatLayout()}
            </div>
            <div className={styles.priceLabel}>
                Total Price: ${totalPrice}
            </div>
            <button
                onClick={handleReservation}
                disabled={selectedSeats.length === 0}
                className={styles.reservationButton}
            >
                Finish Reservation
            </button>
        </div>
    );
}