import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import NotFound from './pages/NotFound/NotFound';
import MovieDetails from './pages/MovieDetails/MovieDetails'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Booking from './pages/Booking/Booking';
import { ToastContainer } from 'react-toastify';
import { PATHS } from './utils/constants';

function App() {
  return (
  <Router>
    <div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={PATHS.MOVIES_PATH} element={<Movies />} />
        <Route path={`${PATHS.MOVIES_PATH}/:movieId`} element={<MovieDetails />} />
        <Route path={PATHS.RESERVATION_PATH} element="{<Reservations />}" />
        <Route path={PATHS.FAVOURITES_PATH} element="{<Favourites />}" />
        <Route path={`${PATHS.MOVIES_PATH}/:movieId${PATHS.BOOKING_PATH}`} element={<Booking />} />
        <Route path={PATHS.LOGIN_PATH} element={<Login />} />
        <Route path={PATHS.REGISTER_PATH} element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App
