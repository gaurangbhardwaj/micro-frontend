import React from "react";

const Hero = () => {
  return (
    <section className="text-center py-5 bg-light">
      <div className="container">
        <h1 className="display-4">Welcome to MyProduct</h1>
        <p className="lead">The best solution for your needs.</p>
        <a href="#cta" className="btn btn-primary btn-lg mt-3">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
