import React from 'react';
const footerStyle = {
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  marginTop: "auto",
  width: "100%",
  backgroundColor: "#222",
};


export default function About() {
  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: '#ffe6f0', minHeight: '100vh' }}
    >
      <div className="container">
        <h2 className="mb-4 text-center">About Food Founder</h2>
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6">
            <p>
              <strong>Food Founder</strong> is a modern food ordering platform that makes it easy
              for users to browse, search, and order delicious meals online. Our goal is to bring
              convenience and variety to your dining experience — whether you're craving fast food,
              healthy dishes, or gourmet meals.
            </p>
            <p>
              With a user-friendly dashboard, real-time search, and secure ordering, we’re committed
              to making your food journey smooth and satisfying.
            </p>
          </div>

          {/* Image Section */}
          <div className="col-md-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
              alt="Delicious food"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>

        {/* Additional Images */}
        <div className="row mt-4">
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Burger"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Healthy salad"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1543353071-873f17a7a088"
              alt="Dessert"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
      <footer style={footerStyle}>
        &copy; 2025 Food Founder. All rights reserved.
      </footer>
    </div>
  );
}
