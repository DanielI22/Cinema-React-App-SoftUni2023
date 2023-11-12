import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import * as movieService from "../../services/movieService";
import { useState, useEffect } from "react";
import styles from "./MovieCarousel.module.css"

export default function MovieCarousel() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        movieService.getAll()
            .then(result => setMovies(result))
            .catch(err => console.log(err))
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: false,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles.carouselContainer}>
            <Slider {...sliderSettings}>
                {movies.map(movie => (
                    <MovieCard key={movie._id}
                        movie={{ ...movie }}
                    />
                ))}
            </Slider>
        </div>
    )


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.customArrowNext}`}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.customArrowPrev}`}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }
}