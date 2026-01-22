import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { listingAPI } from '../api/axios';
import FlashMessage from '../components/FlashMessage';

const AddListing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    country: '',
    location: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFlashMessage(null);

    try {
      const data = new FormData();
      data.append('listing[title]', formData.title);
      data.append('listing[description]', formData.description);
      data.append('listing[price]', formData.price);
      data.append('listing[country]', formData.country);
      data.append('listing[location]', formData.location);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await listingAPI.create(data);
      setFlashMessage({ type: 'success', message: 'New Listing Created!' });
      setTimeout(() => navigate('/listing'), 1500);
    } catch (err) {
      setFlashMessage({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to create listing' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <FlashMessage {...flashMessage} onClose={() => setFlashMessage(null)} />
      
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h3>Add New Listing</h3>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Add a catchy title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback>Title looks good</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Enter a proper title</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} md={4} className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="2000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={8} className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="India"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Bhubaneswar, Odisha"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button 
              type="submit" 
              variant="dark" 
              className="add-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  {' Saving...'}
                </>
              ) : (
                'Save'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddListing;

