import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const StarRating = ({ rating, setRating, readonly = false }) => {
  const [hover, setHover] = useState(0);

  useEffect(() => {
    // Initialize rating display when component mounts
    setRating(rating || 0);
  }, [rating, setRating]);

  return (
    <div className="starability-heartbeat">
      {!readonly && (
        <>
          <Form.Check
            type="radio"
            id="no-rate"
            className="input-no-rate"
            name="rating"
            value="0"
            checked={rating === 0}
            onChange={() => setRating(0)}
            label="No rating"
          />
        </>
      )}
      
      {[1, 2, 3, 4, 5].map((star) => (
        <Form.Check
          key={star}
          inline
          type="radio"
          id={`rate-${star}`}
          name="rating"
          value={star}
          checked={rating === star}
          onChange={() => !readonly && setRating(star)}
          label={
            <i 
              className={star <= (hover || rating) ? "fa-solid fa-star" : "fa-regular fa-star"}
              style={{ color: '#fe4242', cursor: readonly ? 'default' : 'pointer' }}
              onMouseEnter={() => !readonly && setHover(star)}
              onMouseLeave={() => !readonly && setHover(0)}
            />
          }
          disabled={readonly}
        />
      ))}
      
      {!readonly && rating > 0 && (
        <div className="text-muted small mt-1">
          {rating === 1 ? 'Terrible' : 
           rating === 2 ? 'Not good' : 
           rating === 3 ? 'Average' : 
           rating === 4 ? 'Very good' : 'Amazing'}
        </div>
      )}
    </div>
  );
};

export default StarRating;

