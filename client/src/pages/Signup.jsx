import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import FlashMessage from '../components/FlashMessage';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFlashMessage(null);

    try {
      await signup(formData);
      setFlashMessage({ type: 'success', message: 'Account created successfully!' });
      setTimeout(() => navigate('/listing'), 1500);
    } catch (err) {
      setFlashMessage({ 
        type: 'error', 
        message: err.response?.data?.message || 'Signup failed' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-3">
      <FlashMessage {...flashMessage} onClose={() => setFlashMessage(null)} />
      
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <Form.Text className="text-muted">
                Password must be at least 6 characters
              </Form.Text>
            </Form.Group>

            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  {' Creating account...'}
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </Form>
          
          <p className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

