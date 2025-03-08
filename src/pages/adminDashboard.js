import React, { useEffect, useState } from "react";
import { ref, onValue, update, get } from "firebase/database";
import { db } from "../firebaseConfig";
import { sendEmailNotification } from "../utils/emailService";
import "../css/adminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [updatedStocks, setUpdatedStocks] = useState({});
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  useEffect(() => {
    const productsRef = ref(db, "produt");
    const ordersRef = ref(db, "orders");

    // Fetch products
    const unsubscribeProducts = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productsArray = Object.entries(data).map(([id, product]) => ({
            id,
            ...product,
          }));
          setProducts(productsArray);
        }
      },
      (err) => {
        setError("Error fetching products from Firebase.");
      }
    );

    // Fetch orders
    const unsubscribeOrders = onValue(
      ordersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let ordersArray = [];
          Object.entries(data).forEach(([userId, userOrders]) => {
            Object.entries(userOrders).forEach(([orderId, orderDetails]) => {
              ordersArray.push({
                id: orderId,
                userId,
                status: orderDetails.Status,
              });
            });
          });
          setOrders(ordersArray);
        }
      },
      (err) => {
        setError("Error fetching orders from Firebase.");
      }
    );

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
    };
  }, []);

  // Function to update stock
  const updateStock = (productId, newStock) => {
    const productRef = ref(db, `produt/${productId}`);
    update(productRef, { stock: newStock })
      .then(() => {
        console.log("Stock updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating stock: ", error);
      });
  };

  // Handle stock input changes
  const handleStockChange = (productId, newStock) => {
    setUpdatedStocks((prevStocks) => ({
      ...prevStocks,
      [productId]: newStock,
    }));
  };

  // Save all stock updates
  const saveAllChanges = () => {
    Object.entries(updatedStocks).forEach(([productId, newStock]) => {
      updateStock(productId, newStock);
    });
    setUpdatedStocks({});
  };

  // Function to update order status
  const updateOrderStatus = (userId, orderId, newStatus) => {
    const orderRef = ref(db, `orders/${userId}/${orderId}`);
    update(orderRef, { Status: newStatus })
      .then(() => {
        console.log(`Order ${orderId} status updated to ${newStatus}`);
        notifyUser(userId, orderId, newStatus);
      })
      .catch((error) => {
        console.error("Error updating order status: ", error);
      });
  };

  // Function to notify user
  const notifyUser = (userId, orderId, newStatus) => {
    const userRef = ref(db, `users/${userId}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const email = userData.email;
        const name = userData.name;
        sendEmailNotification(email, name, orderId, newStatus);
      }
    });
  };

  // Handle status dropdown change
  const handleStatusChange = (userId, orderId, newStatus) => {
    setUpdatedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newStatus,
    }));

    updateOrderStatus(userId, orderId, newStatus);
  };

  return (
    <div>
      <nav className="admin-navbar">
        <h1 className="admin-navbar-title">Admin Panel</h1>
      </nav>
      <div className="admin-dashboard-cards">
        {/* Inventory Management Section */}
        <div className="admin-dashboard-card">
          <h2>Inventory Management</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th className="admin-dashboard-th">Product</th>
                <th className="admin-dashboard-th">Stock</th>
                <th className="admin-dashboard-th">Update Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="admin-dashboard-td">{product.name}</td>
                  <td className="admin-dashboard-td">{product.stock}</td>
                  <td className="admin-dashboard-td">
                    <input
                      type="number"
                      min="0"
                      defaultValue={product.stock}
                      className="admin-dashboard-input-number"
                      onBlur={(e) =>
                        handleStockChange(product.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="admin-dashboard-save-button"
            onClick={saveAllChanges}
          >
            Save Changes
          </button>
        </div>

        {/* Order Tracking Section */}
        <div className="admin-dashboard-card">
          <h2>Order Tracking</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th className="admin-dashboard-th">Order ID</th>
                <th className="admin-dashboard-th">Status</th>
                <th className="admin-dashboard-th">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-dashboard-td">{order.id}</td>
                  <td className="admin-dashboard-td">{order.status}</td>
                  <td className="admin-dashboard-td">
                    <select
                      className="admin-dashboard-select"
                      value={updatedStatuses[order.id] || order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.userId,
                          order.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
