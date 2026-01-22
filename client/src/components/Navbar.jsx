import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Nav, Button } from 'react-bootstrap';

const NavbarComponent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar expand="md" className="navbar navbar-expand-md navbar-light bg-light border-bottom sticky-top shadow-sm">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/listing" className="d-flex align-items-center navbar-brand">
          <i className="fa-solid fa-compass me-2"></i>ExploreIt
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/listing">Home</Nav.Link>
          </Nav>
          
          <Nav className="ms-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/signup">
                  <i className="fa-solid fa-user-plus me-1"></i>Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <i className="fa-solid fa-right-to-bracket me-1"></i>Log In
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/listing/new" className="add-btn text-white px-3 py-2 rounded">
                  + Add Listing
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="ms-2">
                  <i className="fa-solid fa-right-from-bracket me-1"></i>Log Out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;

