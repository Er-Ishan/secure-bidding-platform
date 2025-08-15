import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewSellerProducts = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));

  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const statusOptions = ["Available", "Deactivated", "Sold", "UnSold"];

  const [allProducts, setAllProducts] = useState([]);

  const [status, setStatus] = useState("");

  const [tempSearchStatus, setTempSearchStatus] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, [status]);

  const retrieveAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/fetch/seller-wise?sellerId=" +
        seller.id +
        "&status=" +
        status
    );
    console.log(response.data);
    return response.data;
  };

  const deleteProduct = (productId, e) => {
    fetch(
      "http://localhost:8080/api/product/delete?productId=" +
        productId +
        "&sellerId=" +
        seller.id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + seller_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const updateProduct = (product) => {
    navigate("/seller/product/update", { state: product });
  };

  const searchProducts = (e) => {
    e.preventDefault();
    setStatus(tempSearchStatus);
  };

  return (
    <div className="mt-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="card-header text-center text-dark"
          style={{
            borderRadius: "15px 15px 0 0",
            height: "50px",
            fontSize: "1.5rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>My Products</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <div className="d-flex aligns-items-center justify-content-center mt-1 mb-4">
            <form className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label" style={{ fontWeight: "500", color: "#495057" }}>
                  Filter By Status
                </label>
              </div>
              <div className="col-auto">
                <select
                  name="status"
                  onChange={(e) => setTempSearchStatus(e.target.value)}
                  className="form-control"
                  style={{ 
                    width: "300px",
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    fontSize: "1rem"
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="">All</option>
                  {statusOptions.map((status, index) => {
                    return <option key={index} value={status}> {status} </option>;
                  })}
                </select>
              </div>
              <div className="col-auto">
                <button
                  type="submit"
                  className="btn mb-3"
                  onClick={searchProducts}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 20px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="table-responsive">
            <table className="table table-hover text-center" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
              <thead className="" style={{ 
                color: "black",
                position: "sticky",
                top: 0,
                zIndex: 1
              }}>
                <tr>
                  <th scope="col" style={{ padding: "12px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>Product</th>
                  <th scope="col" style={{ padding: "12px" }}>Name</th>
                  <th scope="col" style={{ padding: "12px" }}>Description</th>
                  <th scope="col" style={{ padding: "12px" }}>Category</th>
                  <th scope="col" style={{ padding: "12px" }}>Quantity</th>
                  <th scope="col" style={{ padding: "12px" }}>Price</th>
                  <th scope="col" style={{ padding: "12px" }}>Status</th>
                  <th scope="col" style={{ padding: "12px", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => {
                  return (
                    <tr key={product.id} style={{ 
                      backgroundColor: "white",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px"
                    }}>
                      <td style={{ padding: "12px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            product.image1
                          }
                          className="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                            borderRadius: "5px",
                            border: "1px solid #e9ecef"
                          }}
                        />
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{product.name}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#6c757d" }}>{product.description}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{product.category.name}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{product.quantity}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#28a745" }}>${product.price}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <span 
                          style={{
                            padding: "5px 10px",
                            borderRadius: "20px",
                            fontWeight: "500",
                            backgroundColor: 
                              product.status === "Available" ? "#d4edda" :
                              product.status === "Sold" ? "#f8d7da" :
                              product.status === "Deactivated" ? "#e2e3e5" : "#fff3cd",
                            color: 
                              product.status === "Available" ? "#155724" :
                              product.status === "Sold" ? "#721c24" :
                              product.status === "Deactivated" ? "#383d41" : "#856404"
                          }}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
                        {(() => {
                          if (
                            product.status !== "Sold" &&
                            product.status !== "Deactivated"
                          ) {
                            return (
                              <button
                                onClick={() => updateProduct(product)}
                                className="btn btn-sm ms-2"
                                style={{
                                  backgroundColor: "#17a2b8",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "5px",
                                  padding: "5px 15px",
                                  fontWeight: "500",
                                  transition: "all 0.3s ease"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#138496"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#17a2b8"}
                              >
                                Update
                              </button>
                            );
                          }
                        })()}

                        {(() => {
                          if (product.status === "Available") {
                            return (
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="btn btn-sm ms-2"
                                style={{
                                  backgroundColor: "#dc3545",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "5px",
                                  padding: "5px 15px",
                                  fontWeight: "500",
                                  transition: "all 0.3s ease"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                              >
                                Delete
                              </button>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSellerProducts;