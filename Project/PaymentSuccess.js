import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: '#fff',
        textAlign: 'center',
        paddingTop: '15%',
        paddingLeft: '10%',
        paddingRight: '10%',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'inline-block',
          padding: '40px',
          borderRadius: '15px',
        }}
      >
        <h1>✅ Payment Successful!</h1>
        <h3>🍽️ Your order is confirmed.</h3>
        <p>⏱️ Your food will be delivered within <strong>15 minutes</strong>.</p>
        <button
          onClick={() => navigate('/Dashboard')}
          className="btn btn-light mt-4"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
} 