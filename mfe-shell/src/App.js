// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const MarketingPage = React.lazy(() => import("mfeMarketing/MarketingPage"));
const LoginPage = React.lazy(() => import("mfeApp/LoginPage"));

const App = () => (
  <Router>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </React.Suspense>
  </Router>
);

export default App;
