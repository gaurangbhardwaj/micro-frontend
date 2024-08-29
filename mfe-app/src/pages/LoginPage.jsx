import React, { useState, Suspense } from "react";
const Button = React.lazy(() => import("mfeCommon/Button"));
const Input = React.lazy(() => import("mfeCommon/Input"));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <Suspense fallback="Loading...">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="form-control"
              />
            </div>
            <Button
              text="Login"
              type="submit"
              className="btn btn-primary w-100"
            />
          </form>
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
