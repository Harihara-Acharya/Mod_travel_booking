import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner, Alert, Form } from 'react-bootstrap';
import { listingAPI, reviewAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import MapView from '../components/MapView';
import FlashMessage from '../components/FlashMessage';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  
  // Review form state
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await listingAPI.getOne(id);
      setListing(response.data);
    } catch (err) {
      setError('Listing not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingAPI.delete(id);
        setFlashMessage({ type: 'success', message: 'Listing deleted successfully!' });
        setTimeout(() => navigate('/listing'), 1500);
      } catch (err) {
        setFlashMessage({ type: 'error', message: 'Failed to delete listing' });
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.delete(id, reviewId);
        setFlashMessage({ type: 'success', message: 'Review deleted successfully!' });
        fetchListing(); // Refresh data
      } catch (err) {
        setFlashMessage({ type: 'error', message: 'Failed to delete review' });
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newRating === 0) {
      setFlashMessage({ type: 'error', message: 'Please select a rating' });
      return;
    }

    setReviewLoading(true);
    try {
      await reviewAPI.create(id, { rating: newRating, comment });
      setFlashMessage({ type: 'success', message: 'Review added successfully!' });
      setNewRating(0);
      setComment('');
      fetchListing(); // Refresh data
    } catch (err) {
      setFlashMessage({ type: 'error', message: 'Failed to add review' });
    } finally {
      setReviewLoading(false);
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

  if (error || !listing) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error || 'Listing not found'}</Alert>
        <Button as={Link} to="/listing" variant="primary">Back to Listings</Button>
      </Container>
    );
  }

  const isOwner = user && listing.owner && user._id === listing.owner._id;

  return (
    <Container className="mt-5">
      <FlashMessage {...flashMessage} onClose={() => setFlashMessage(null)} />
      
      <Row>
        <Col lg={8}>
          <Card className="listing-card">
            <Card.Img 
              variant="top" 
              src={listing.image?.url || '/images/placeholder.jpg'} 
              alt={listing.title}
              className="show-img"
              style={{ height: '40vh', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title className="h3"><b>{listing.title}</b></Card.Title>
              <Card.Text>
                Owned by {listing.owner?.username || 'Unknown'}
              </Card.Text>
              <Card.Text>
                {listing.description}
                <br />
                <i className="fa-solid fa-location-dot"></i>
                {listing.location}, {listing.country}
                <br />
                <span className="fw-bold text-danger">
                  ₹ {listing.price?.toLocaleString('en-IN')}
                </span>
                /Night
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Action buttons for owner */}
          {isOwner && (
            <div className="show-bts mt-3">
              <Button as={Link} to={`/listing/${id}/edit`} variant="dark" className="add-btn text-white text-decoration-none">
                Edit
              </Button>
              <Button 
                variant="danger" 
                className="offset-1"
                onClick={handleDeleteListing}
              >
                Delete
              </Button>
            </div>
          )}

          {/* Reviews Section */}
          <div className="mt-4">
            <h4><b>All Reviews</b></h4>
            <Row>
              {listing.reviews && listing.reviews.length > 0 ? (
                listing.reviews.map((review) => (
                  <Col key={review._id} xs={12} md={6} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title className="h5">
                          {review.author?.username || 'Unknown'}
                        </Card.Title>
                        <StarRating rating={review.rating} readonly={true} />
                        <Card.Text className="mt-2">{review.comment}</Card.Text>
                        
                        {user && review.author && user._id === review.author._id && (
                          <Form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleDeleteReview(review._id);
                            }}
                          >
                            <Button 
                              type="submit" 
                              variant="dark" 
                              size="sm"
                              className="mt-2"
                            >
                              Delete Review
                            </Button>
                          </Form>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-muted">No reviews yet. Be the first to leave a review!</p>
                </Col>
              )}
            </Row>
          </div>

          {/* Add Review Form */}
          {user && (
            <div className="mt-4 mb-4">
              <h4>Leave a Review</h4>
              <Form onSubmit={handleReviewSubmit}>
                <StarRating rating={newRating} setRating={setNewRating} />
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    required
                  />
                </Form.Group>
                <Button 
                  type="submit" 
                  variant="outline-dark"
                  disabled={reviewLoading}
                >
                  {reviewLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </Form>
            </div>
          )}
        </Col>

        {/* Map Section */}
        <Col lg={4}>
          <MapView 
            location={listing.location}
            country={listing.country}
            title={listing.title}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetail;

