import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ViewSellerOrders = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const [orders, setOrders] = useState([]);

  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  const [assignOrderId, setAssignOrderId] = useState("");
  const [deliveryPersonId, setDeliveryPersonId] = useState("");

  const [allDelivery, setAllDelivery] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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

    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllDelivery(allUsers.users);
      }
    };

    getAllOrders();
    getAllUsers();
  }, [orderId]);

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/seller-wise?sellerId=" + seller.id,
      {
        headers: {
          Authorization: "Bearer " + seller_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/seller/delivery-person?sellerId=" +
        seller.id,
      {
        headers: {
          Authorization: "Bearer " + seller_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveOrdersById = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch?orderId=" + orderId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
  };

  const assignDelivery = (orderId, e) => {
    setAssignOrderId(orderId);
    handleShow();
  };

  const assignToDelivery = (orderId, e) => {
    let data = { orderId: assignOrderId, deliveryId: deliveryPersonId };

    fetch("http://localhost:8080/api/order/assign/delivery-person", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + seller_jwtToken,
      },
      body: JSON.stringify(data),
    })
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
            setOrders(res.orders);
            setTimeout(() => {
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
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
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
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
            }, 2000); // Redirect after 3 seconds
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

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg">
        <div className="card-header text-dark">
          <h2 className="mb-0 text-center">Seller Orders</h2>
        </div>
        
        <div className="card-body">
          {/* Search Form */}
          <div className="row mb-4">
            <div className="col-md-6">
              <form className="row g-3">
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
                    onClick={searchOrderById}
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order.orderId}>
                      <td><b>{order.orderId}</b></td>
                      <td>
                        <img
                          src={"http://localhost:8080/api/product/" + order.product.image1}
                          className="img-thumbnail"
                          alt="product"
                          style={{ width: "80px", height: "60px", objectFit: "cover" }}
                        />
                      </td>
                      <td><b>{order.product.name}</b></td>
                      <td><b>{order.product.category.name}</b></td>
                      <td><b>{order.product.seller.firstName}</b></td>
                      <td><b>₹{order.product.price}</b></td>
                      <td><b>₹{order.productOffer.amount}</b></td>
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
                          <b>{order.deliveryDate + " " + order.deliveryTime}</b>
                        ) : (
                          <span className="badge bg-warning text-dark">Processing</span>
                        )}
                      </td>
                      <td>
                        {order.deliveryPerson ? (
                          <span className="badge bg-success">Assigned</span>
                        ) : (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => assignDelivery(order.orderId)}
                          >
                            Assign Delivery
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Assign To Delivery Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label fw-bold">Order ID</label>
            <input 
              type="text" 
              className="form-control" 
              value={assignOrderId} 
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Delivery Person</label>
            <select
              className="form-select"
              onChange={(e) => setDeliveryPersonId(e.target.value)}
              value={deliveryPersonId}
            >
              <option value="">Select Delivery Person</option>
              {allDelivery.map((delivery) => {
                return (
                  <option value={delivery.id}>
                    {delivery.firstName + " " + delivery.lastName}
                  </option>
                );
              })}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => assignToDelivery(assignOrderId)}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ViewSellerOrders;
