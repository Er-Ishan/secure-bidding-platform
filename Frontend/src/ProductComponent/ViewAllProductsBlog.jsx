
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllProductsBlog = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, []);

  const retrieveAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/product/fetch/all?status="
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { products: [] };
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Auction Galary</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {allProducts.map((product, index) => (
          <div key={index} className="col">
            <div className="card rounded-card custom-bg h-100 shadow-lg">
              <img
                src={`http://localhost:8080/api/product/${product.image1}`}
                className="card-img-top img-fluid rounded"
                alt="Product"
                style={{
                  height: "300px", // Fixed height
                  width: "100%", // Ensures full width
                  objectFit: "cover", // Ensures image fills the area without distortion
                }}
              />
              <div className="card-body text-color">
                <h5 className="card-title">
                  <b>{product.name}</b>
                </h5>
                <p className="card-text">
                  <b>{product.description}</b>
                </p>
                <h6>Category: <b>{product.category.name}</b></h6>
                <h6>Quantity: <b>{product.quantity}</b></h6>
                <h5 className="text-primary">Price: ₹{product.price}</h5>
                <h6>Seller: <b>{product.seller.firstName}</b></h6>
                <span
                  className={`badge ${
                    product.status === "Available"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllProductsBlog;
