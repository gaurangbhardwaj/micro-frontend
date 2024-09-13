import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const MarketingPage = React.lazy(() => import("mfeMarketing/MarketingPage"));
const LoginPage = React.lazy(() => import("mfeApp/LoginPage"));

const App = () => (
  <Router>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="*" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    </React.Suspense>
  </Router>
);

export default App;
