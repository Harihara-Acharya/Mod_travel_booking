import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import FlashMessage from '../components/FlashMessage';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
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
      await login(formData);
      setFlashMessage({ type: 'success', message: 'Welcome back!' });
      setTimeout(() => navigate('/listing'), 1500);
    } catch (err) {
      setFlashMessage({ 
        type: 'error', 
        message: err.response?.data?.message || 'Login failed' 
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
          <h1>Login</h1>
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
              <Form.Control.Feedback type="invalid">
                Enter a proper username
              </Form.Control.Feedback>
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
              />
              <Form.Control.Feedback type="invalid">
                Enter a proper password
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              type="submit" 
              variant="success"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  {' Logging in...'}
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>
          
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

