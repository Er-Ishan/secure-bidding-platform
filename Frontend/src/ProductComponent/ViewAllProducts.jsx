import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const retrieveAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/fetch/all?status="
    );
    return response.data;
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 text-center">All Products</h2>
        </div>
        
        <div className="card-body">
          <div className="table-responsive" style={{ maxHeight: "65vh", overflowY: "auto" }}>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={`http://localhost:8080/api/product/${product.image1}`}
                        className="img-thumbnail"
                        alt="product"
                        style={{ width: "80px", height: "60px", objectFit: "cover" }}
                      />
                    </td>
                    <td><b>{product.name}</b></td>
                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                      <b>{product.description}</b>
                    </td>
                    <td><b>{product.category?.name || "N/A"}</b></td>
                    <td><b>{product.quantity}</b></td>
                    <td><b>₹{product.price}</b></td>
                    <td><b>{product.seller?.firstName || "N/A"}</b></td>
                    <td>
                      <span className={`badge ${
                        product.status === "Available" ? "bg-success" :
                        product.status === "Sold" ? "bg-danger" :
                        "bg-secondary"
                      }`}>
                        <b>{product.status}</b>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllProducts;