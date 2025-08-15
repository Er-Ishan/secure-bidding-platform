import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewSellerDeliveryPerson = () => {
  const [allDelivery, setAllDelivery] = useState([]);

  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllDelivery(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/seller/delivery-person?sellerId=" +
        seller.id,
      {
        headers: {
          Authorization: "Bearer " + seller_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const deleteDelivery = (userId, e) => {
    fetch(
      "http://localhost:8080/api/user/delete/seller/delivery-person?deliveryId=" +
        userId,
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
            }, 1000);
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
            }, 1000);
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
        }, 1000);
      });
  };

  return (
    <div className="mt-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div
        className="card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
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
          <h2 style={{ margin: 0 }}>All Delivery Persons</h2>
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
              <thead style={{ 
                color: "black",
                position: "sticky",
                top: 0,
                zIndex: 1
              }}>
                <tr>
                  <th scope="col" style={{ padding: "12px", borderTopLeftRadius: "10px" }}>First Name</th>
                  <th scope="col" style={{ padding: "12px" }}>Last Name</th>
                  <th scope="col" style={{ padding: "12px" }}>Email</th>
                  <th scope="col" style={{ padding: "12px" }}>Phone</th>
                  <th scope="col" style={{ padding: "12px" }}>Address</th>
                  <th scope="col" style={{ padding: "12px", borderTopRightRadius: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allDelivery.map((delivery) => {
                  return (
                    <tr key={delivery.id} style={{ 
                      backgroundColor: "white",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px"
                    }}>
                      <td style={{ padding: "12px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{delivery.firstName}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{delivery.lastName}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#6c757d" }}>{delivery.emailId}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#2c3e50" }}>{delivery.phoneNo}</b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle" }}>
                        <b style={{ color: "#6c757d" }}>
                          {delivery.address.street +
                            ", " +
                            delivery.address.city +
                            ", " +
                            delivery.address.pincode}
                        </b>
                      </td>
                      <td style={{ padding: "12px", verticalAlign: "middle", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
                        <button
                          onClick={() => deleteDelivery(delivery.id)}
                          className="btn btn-sm"
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

export default ViewSellerDeliveryPerson;