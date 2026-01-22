import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ListingCard = ({ listing }) => {
  const { _id, title, image, location, price } = listing;

  return (
    <div className="col d-flex">
      <Link to={`/listing/${_id}`} className="listing-a-tag w-100 text-decoration-none">
        <Card className="h-100 listing-card shadow-sm">
          <Card.Img 
            variant="top" 
            src={image?.url || '/images/placeholder.jpg'} 
            alt={title}
            style={{ height: '16rem', objectFit: 'cover' }}
          />
          <Card.Body className="d-flex flex-column justify-content-between">
            <div>
              <Card.Title className="mb-2">{title}</Card.Title>
              <Card.Text className="text-muted mb-2" style={{ fontSize: '0.95rem' }}>
                <i className="fa-solid fa-location-dot"></i>
                {location || 'Unknown Location'}
              </Card.Text>
            </div>
            <div>
              <span className="fw-bold text-danger">₹ {price?.toLocaleString('en-IN')}</span>
              <span className="text-muted"> /Night</span>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default ListingCard;

