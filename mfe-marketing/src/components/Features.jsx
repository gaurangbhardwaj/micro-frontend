import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-5">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-speedometer2 display-4"></i>
            <h3 className="mt-3">Fast</h3>
            <p>Experience lightning-fast performance with our product.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-shield-check display-4"></i>
            <h3 className="mt-3">Secure</h3>
            <p>Top-notch security features to protect your data.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-heart display-4"></i>
            <h3 className="mt-3">Loved</h3>
            <p>Trusted and loved by thousands of users worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
