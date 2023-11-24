import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import NotFound from './components/NotFound/NotFound';
import MovieDetails from './components/MovieDetails/MovieDetails'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Booking from './components/Booking/Booking';
import { ToastContainer } from 'react-toastify';
import { PATHS } from './utils/constants';
import { AuthProvider } from './contexts/authContext';
import Logout from './components/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Favourites from './components/Favourites/Favourites';
import Reservations from './components/Reservations/Reservations';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.MOVIES} element={<Movies />} />
            <Route path={`${PATHS.MOVIES}/:movieId`} element={<MovieDetails />} />
            <Route path={PATHS.RESERVATIONS} element={<Reservations />} />
            <Route path={PATHS.FAVOURITES} element={<Favourites />} />
            <Route path={`${PATHS.MOVIES}/:movieId${PATHS.BOOKING}`} element={<ProtectedRoute><Booking /></ProtectedRoute>} />
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.REGISTER} element={<Register />} />
            <Route path={PATHS.LOGOUT} element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
