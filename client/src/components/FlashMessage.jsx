import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const FlashMessage = ({ type = 'success', message, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show || !message) return null;

  return (
    <Alert 
      variant={type === 'error' ? 'danger' : type} 
      className="alert fade show position-fixed top-0 start-50 translate-middle-x mt-4"
      style={{ zIndex: 9999, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
      onClose={() => setShow(false)}
      dismissible
    >
      {message}
    </Alert>
  );
};

export default FlashMessage;

