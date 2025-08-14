import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]); // 🛒 Orders state
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  // 🔒 Redirect to Login if user is not authenticated
  useEffect(() => {
    const user = localStorage.getItem("registeredUser");
    if (!user) {
      navigate("/Login");
    }
  }, [navigate]);

  // 📦 Fetch food items
  useEffect(() => {
    axios.get('http://localhost:5000/Dashboard')
      .then(res => {
        console.log('Fetched items:', res.data);
        setFoodItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching food items:', err);
        setLoading(false);
      });
  }, []);

  // Helper function to fetch offers based on current orders
  const fetchOffers = async (orderedItems) => {
  try {
    const res = await axios.post('http://localhost:5000/get-offers', { orderedItems });
    console.log("🔁 Offers from backend:", res.data.offers);
    setOffers(res.data.offers || []);
  } catch (error) {
    console.error("Error fetching offers:", error);
    setOffers([]);
  }
};


  // Modified removeOrder to update offers after removing an order
  const removeOrder = (indexToRemove) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((_, index) => index !== indexToRemove);

      // Extract FoodNames from updatedOrders
      const orderedNames = updatedOrders.map(food => food.FoodName);

      // Fetch offers based on updated orders
      fetchOffers(orderedNames);

      return updatedOrders;
    });
  };

  // ✅ Add this with your other functions
  const handleOrder = async (item) => {
    const updatedOrders = [...orders, item];
    setOrders(updatedOrders);

    // Extract food names from all ordered items
    const orderedNames = updatedOrders.map((food) => food.FoodName);
    fetchOffers(orderedNames);

    try {
      const res = await axios.post('http://localhost:5000/get-offers', {
        orderedItems: orderedNames,
      });

      setOffers(res.data.offers || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const calculateDiscount = (orders, offers) => {
  let totalDiscount = 0;

  offers.forEach((offer) => {
    if (offer.applied) {
      totalDiscount += offer.discountAmount || 0;
    }
  });

  return totalDiscount;
};

const totalAmount = orders.reduce((sum, item) => sum + item.Price, 0);
const totalDiscount = calculateDiscount(orders, offers);

const finalAmount = totalAmount - totalDiscount;

  const footerStyle = {
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    marginTop: "auto",
    width: "100%",
    backgroundColor: "#222",
  };



  return (
    <div style={{ backgroundColor: '#ffe4e6', minHeight: '100vh' }}>
      {/* rest of your dashboard code */}
      {/* Navbar */}
      <nav className="navbar bg-body-secondary px-4 py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src="https://i.pinimg.com/736x/af/b4/2d/afb42de544c5fb6caae0deecc991dd51.jpg"
            alt="logo"
            width="100"
            height="94"
            className="d-inline-block align-text-top"
          />
          </div>
          <div
    className="position-absolute start-50 translate-middle-x text-center"
    style={{ fontWeight: 'bold', fontSize: '3.0rem',fontFamily: 'cursive', color: '#333' }}
  >
    Tummy Tap
  </div>

        <ul className="list-inline m-0 d-flex align-items-center">
          {/* 🧾 Orders Dropdown */}
          <li className="list-inline-item dropdown me-3" style={{ position: 'relative' }}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setOrdersOpen(prev => !prev)}
            >
              🧾 Orders
            </button>

            {ordersOpen && (
              <ul className="dropdown-menu show" style={{ display: 'block', position: 'absolute', right: '100px', top: '100%', zIndex: 999 }}>
                {orders.length === 0 ? (
                  <li className="dropdown-item text-muted">No orders yet</li>
                ) : (
                  <>
                    {orders.map((item, index) => (
                      <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                        <span>{item.FoodName} - ₹{item.Price}</span>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeOrder(index);
                          }}
                        >
                          🗑️
                        </button>
                      </li>
                    ))}
                    <li className="dropdown-item d-flex justify-content-between border-top pt-2">
                      <span>Subtotal:</span>
                      <span>₹{totalAmount}</span>
                    </li>
                    <li className="dropdown-item d-flex justify-content-between text-success">
                      <span>Discount:</span>
                      <span>-₹{totalDiscount}</span>
                    </li>
                    <li className="dropdown-item fw-bold d-flex justify-content-between">
                      <span>Total:</span>
                      <span>₹{finalAmount}</span>
                    </li>

                    <li className="dropdown-item d-flex justify-content-center mt-2">
                      <button
                        className="btn btn-success"
                        onClick={() => navigate("/confirm-order", { state: { orders, totalAmount: finalAmount } })}

                        disabled={orders.length === 0}
                      >
                        ✅ Confirm Order
                      </button>
                    </li>

                  </>
                )}
              </ul>
            )}
          </li>

          <li className="list-inline-item dropdown me-3" style={{ position: 'relative' }}>
            <button className="btn btn-outline-success" onClick={() => setOffersOpen(prev => !prev)}>
              🎁 Offers
            </button>

            {offersOpen && (
              <ul
                className="dropdown-menu show"
                style={{
                  display: 'block',
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  zIndex: 999,
                  maxWidth: '320px',          // constrain width to prevent overflow
                  padding: '10px',            // add padding for better spacing
                  overflowWrap: 'break-word', // wrap long words
                  whiteSpace: 'normal',       // allow wrapping across lines
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // optional, for dropdown shadow
                }}
              >
                {offers.length > 0 ? (
                  offers.map((offer, i) => (
                    <li key={i} className="dropdown-item" style={{ overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                      <strong>{offer.FoodName}:</strong> {offer.text}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item text-muted">No offers available</li>
                )}
              </ul>

            )}
          </li>

          <li className="list-inline-item">
            <button
              onClick={() => navigate("/About")}
              className="btn btn-link text-decoration-none"
            >
              About
            </button>
          </li>
        </ul>
      </nav>

      {/* Search Bar */}
      <div className="text-left my-3 px-4">
        <input
          type="text"
          placeholder="Search food by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* Food Items Grid */}
      <div className="container-fluid">
        <div className="row">
          {loading && <p>Loading food items...</p>}
          {!loading && foodItems.length === 0 && <p>No food items found.</p>}
          {!loading &&
            foodItems
              .filter((item) =>
                item.FoodName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <div className="col-md-4" key={item._id}>
                  <div className="card m-3">
                    <img
                      src={item.img}
                      className="card-img-top"
                      alt={item.FoodName}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.FoodName}</h5>
                      <p className="card-text">{item.Description}</p>
                      <p className="card-text fw-bold">Price: ₹{item.Price}</p>
                      <button
                        className="btn btn-warning rounded-pill px-4 py-2 shadow"
                        onClick={() => handleOrder(item)}
                      >
                        🍽️ Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <footer style={footerStyle}>
        &copy; 2025 Food Founder. All rights reserved.
      </footer>
    </div>
  );
}
