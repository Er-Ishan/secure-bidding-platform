import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewMyOrders = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [orders, setOrders] = useState([]);

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await retrieveCart();
      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    getAllOrders();
  }, []);

  const retrieveCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/user-wise?userId=" + user.id,
      {
        headers: {
          Authorization: "Bearer " + customer_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  return (
    <div className="mt-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "40rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "15px",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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
          <h2 style={{ margin: 0 }}>My Orders</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-center" style={{ 
              borderCollapse: "separate", 
              borderSpacing: "0 10px",
              width: "100%"
            }}>
              <thead className="text-dark" style={{ 
                color: "white",
                position: "sticky",
                top: 0,
                zIndex: 1
              }}>
                <tr>
                  <th scope="col" style={{ padding: "12px", borderTopLeftRadius: "10px" }}>Order ID</th>
                  <th scope="col" style={{ padding: "12px" }}>Product</th>
                  <th scope="col" style={{ padding: "12px" }}>Name</th>
                  <th scope="col" style={{ padding: "12px" }}>Category</th>
                  <th scope="col" style={{ padding: "12px" }}>Seller</th>
                  <th scope="col" style={{ padding: "12px" }}>Price</th>
                  <th scope="col" style={{ padding: "12px" }}>Qty</th>
                  <th scope="col" style={{ padding: "12px" }}>Status</th>
                  <th scope="col" style={{ padding: "12px" }}>Delivery Person</th>
                  <th scope="col" style={{ padding: "12px" }}>Contact</th>
                  <th scope="col" style={{ padding: "12px" }}>Delivery Time</th>
                  <th scope="col" style={{ padding: "12px", borderTopRightRadius: "10px" }}>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order.orderId} style={{ 
                      backgroundColor: "white",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px"
                    }}>
                      <td style={{ padding: "12px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>
                        <b style={{ color: "#495057" }}>{order.orderId}</b>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <img
                          src={"http://localhost:8080/api/product/" + order.product.image1}
                          className="img-fluid"
                          alt="product"
                          style={{
                            maxWidth: "90px",
                            borderRadius: "5px",
                            border: "1px solid #e9ecef"
                          }}
                        />
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{order.product.name}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#6c757d" }}>{order.product.category.name}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{order.product.seller.firstName}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#28a745" }}>${order.productOffer.amount}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#495057" }}>{order.quantity}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <span style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontWeight: "500",
                          backgroundColor: 
                            order.status === "Delivered" ? "#d4edda" :
                            order.status === "Shipped" ? "#cce5ff" :
                            order.status === "Processing" ? "#fff3cd" : "#f8d7da",
                          color: 
                            order.status === "Delivered" ? "#155724" :
                            order.status === "Shipped" ? "#004085" :
                            order.status === "Processing" ? "#856404" : "#721c24"
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        {order.deliveryPerson ? (
                          <b style={{ color: "#2c3e50" }}>{order.deliveryPerson.firstName}</b>
                        ) : (
                          <b style={{ color: "#dc3545" }}>Pending</b>
                        )}
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        {order.deliveryPerson ? (
                          <b style={{ color: "#2c3e50" }}>{order.deliveryPerson.phoneNo}</b>
                        ) : (
                          <b style={{ color: "#dc3545" }}>Pending</b>
                        )}
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        {order.deliveryDate ? (
                          <b style={{ color: "#2c3e50" }}>
                            {order.deliveryDate + " " + order.deliveryTime}
                          </b>
                        ) : (
                          <b style={{ color: "#dc3545" }}>Pending</b>
                        )}
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
                        <span style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontWeight: "500",
                          backgroundColor: 
                            order.status === "Delivered" ? "#d4edda" :
                            order.status === "Shipped" ? "#cce5ff" :
                            order.status === "Processing" ? "#fff3cd" : "#f8d7da",
                          color: 
                            order.status === "Delivered" ? "#155724" :
                            order.status === "Shipped" ? "#004085" :
                            order.status === "Processing" ? "#856404" : "#721c24"
                        }}>
                          {order.status || "Pending"}
                        </span>
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

export default ViewMyOrders;