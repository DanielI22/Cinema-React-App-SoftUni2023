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
import { AuthProvider } from './contexts/authContext';
import Logout from './pages/Logout/Logout';

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
            <Route path={PATHS.RESERVATION} element="{<Reservations />}" />
            <Route path={PATHS.FAVOURITES} element="{<Favourites />}" />
            <Route path={`${PATHS.MOVIES}/:movieId${PATHS.BOOKING}`} element={<Booking />} />
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
