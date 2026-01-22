import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { listingAPI } from '../api/axios';
import FlashMessage from '../components/FlashMessage';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    country: '',
    location: '',
    image: null,
    existingImage: ''
  });

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await listingAPI.getOne(id);
      const listing = response.data;
      setFormData({
        title: listing.title || '',
        description: listing.description || '',
        price: listing.price || '',
        country: listing.country || '',
        location: listing.location || '',
        image: null,
        existingImage: listing.image?.url || ''
      });
    } catch (err) {
      setFlashMessage({ type: 'error', message: 'Failed to load listing' });
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);
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

      await listingAPI.update(id, data);
      setFlashMessage({ type: 'success', message: 'Listing updated successfully!' });
      setTimeout(() => navigate(`/listing/${id}`), 1500);
    } catch (err) {
      setFlashMessage({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to update listing' 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <FlashMessage {...flashMessage} onClose={() => setFlashMessage(null)} />
      
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h3>Edit Listing</h3>
          
          {formData.existingImage && (
            <div className="mb-3">
              <p className="text-muted">Current Image:</p>
              <img 
                src={formData.existingImage} 
                alt="Current listing" 
                style={{ maxWidth: '200px', borderRadius: '1rem' }}
              />
            </div>
          )}
          
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
              <Form.Label>Upload New Image (optional)</Form.Label>
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
              disabled={saving}
            >
              {saving ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  {' Saving...'}
                </>
              ) : (
                'Update'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditListing;

