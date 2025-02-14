import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";
import MyOrders from "./MyOrders";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
