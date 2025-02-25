import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebaseConfig";
import "../css/adminDashboard.css";


const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [updatedStocks, setUpdatedStocks] = useState({});

  useEffect(() => {
    const productsRef = ref(db, "produt");

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

    return () => {
      unsubscribeProducts();
    };
  }, []);

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

  const handleStockChange = (productId, newStock) => {
    setUpdatedStocks((prevStocks) => ({
      ...prevStocks,
      [productId]: newStock,
    }));
  };

  const saveAllChanges = () => {
    Object.entries(updatedStocks).forEach(([productId, newStock]) => {
      updateStock(productId, newStock);
    });
    setUpdatedStocks({});
  };

  return (
    <div>
      <h1 className="admin-th">Admin Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="admin-dashboard-inventory-section">
        <h2>Inventory Management</h2>
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
    </div>
  );
};

export default AdminDashboard;
