import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import AddListing from './pages/AddListing';
import EditListing from './pages/EditListing';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <NavbarComponent />
          <Container className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing" element={<Home />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/listing/new" element={<AddListing />} />
              <Route path="/listing/:id/edit" element={<EditListing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

