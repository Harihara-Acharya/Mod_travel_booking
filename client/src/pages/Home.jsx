import { useState, useEffect } from 'react';
import { Row, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { listingAPI } from '../api/axios';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await listingAPI.getAll();
      setListings(response.data);
    } catch (err) {
      setError('Failed to load listings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <h2 className="mb-0">All Listings</h2> */}
        <Link to="/listing/new" className="btn add-btn text-white">
          + Add Listing
        </Link>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </Row>

      {listings.length === 0 && (
        <Alert variant="info" className="mt-4">
          No listings found. Be the first to add one!
        </Alert>
      )}
    </div>
  );
};

export default Home;

