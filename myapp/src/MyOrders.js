import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Fetch user ID from localStorage

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders/${userId}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.foodId._id}>
                  {item.foodId.name} - {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
