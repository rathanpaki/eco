import React, { useEffect, useState } from "react";
import "../css/wishList.css";


const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Please log in to view your wishlist.");
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(wishlist);
  }, []);

  const handleRemove = (index) => {
    const newWishlistItems = wishlistItems.filter((_, i) => i !== index);
    setWishlistItems(newWishlistItems);
    localStorage.setItem("wishlist", JSON.stringify(newWishlistItems));
  };

  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      <table className="wishlist-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Stock Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <span>{product.name}</span>
              </td>
              <td>
                {product.oldPrice && (
                  <span className="old-price">{product.oldPrice}</span>
                )}
                <span className="price">{product.price}</span>
              </td>
              <td>{product.stockStatus}</td>
              <td>
                <button className="add-to-cart-button">Add to Cart</button>
                <button
                  className="delete-button"
                  onClick={() => handleRemove(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
