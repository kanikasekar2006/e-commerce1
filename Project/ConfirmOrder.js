import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConfirmOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, totalAmount } = location.state || { orders: [], totalAmount: 0 };

  const handlePayment = () => {
  // Simulate successful payment then redirect
  navigate("/payment-success");
};

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h2 className="mb-4">🧾 Confirm Your Order</h2>

      {orders.length === 0 ? (
        <p>No order details found.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {orders.map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>{item.FoodName}</span>
                <span>₹{item.Price}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </li>
          </ul>

          <button className="btn btn-primary btn-lg" onClick={handlePayment}>
            💳 Pay ₹{totalAmount}
          </button>
        </>
      )}
    </div>
  );
}
