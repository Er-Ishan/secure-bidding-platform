import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/all",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    return response.data;
  };

  const retrieveOrdersById = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch?orderId=" + orderId,
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    return response.data;
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
  };

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById();
      } else {
        allOrders = await retrieveAllorders();
      }

      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    getAllOrders();
  }, [orderId]);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 text-center">All Orders</h2>
        </div>
        
        <div className="card-body">
          {/* Search Form */}
          <div className="row mb-4">
            <div className="col-md-6">
              <form className="row g-3" onSubmit={searchOrderById}>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Order ID..."
                    onChange={(e) => setTempOrderId(e.target.value)}
                    value={tempOrderId}
                  />
                </div>
                <div className="col-md-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Orders Table */}
          <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
                  <th scope="col">Win Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Status</th>
                  <th scope="col">Delivery Person</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td><b>{order.orderId}</b></td>
                    <td>
                      <img
                        src={`http://localhost:8080/api/product/${order.product.image1}`}
                        className="img-thumbnail"
                        alt="product"
                        style={{ width: "80px", height: "60px", objectFit: "cover" }}
                      />
                    </td>
                    <td><b>{order.product.name}</b></td>
                    <td><b>{order.product.category.name}</b></td>
                    <td><b>{order.product.seller.firstName}</b></td>
                    <td><b>₹{order.product.price}</b></td>
                    <td><b>₹{order.productOffer?.amount || "N/A"}</b></td>
                    <td><b>{order.quantity}</b></td>
                    <td><b>{order.user.firstName}</b></td>
                    <td>
                      <span className={`badge ${
                        order.status === "Delivered" ? "bg-success" :
                        order.status === "Shipped" ? "bg-primary" :
                        order.status === "Processing" ? "bg-warning text-dark" :
                        "bg-secondary"
                      }`}>
                        <b>{order.status}</b>
                      </span>
                    </td>
                    <td>
                      {order.deliveryPerson ? (
                        <b>{order.deliveryPerson.firstName}</b>
                      ) : (
                        <span className="badge bg-danger">Pending</span>
                      )}
                    </td>
                    <td>
                      {order.deliveryPerson ? (
                        <b>{order.deliveryPerson.phoneNo}</b>
                      ) : (
                        <span className="badge bg-danger">Pending</span>
                      )}
                    </td>
                    <td>
                      {order.deliveryDate ? (
                        <b>{order.deliveryDate} {order.deliveryTime}</b>
                      ) : (
                        <span className="badge bg-warning text-dark">Pending</span>
                      )}
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

export default ViewAllOrders;