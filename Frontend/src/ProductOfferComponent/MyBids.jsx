import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBids = () => {
  let navigate = useNavigate();
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [myOffers, setMyOffers] = useState([]);

  const retrieveMyOffers = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/offer/fetch/user?userId=" + user.id,
      {
        headers: {
          Authorization: "Bearer " + customer_jwtToken,
        },
      }
    );
    return response.data;
  };

  const deleteProductOffer = async (offerId) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/product/offer/id?offerId=" + offerId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + customer_jwtToken,
          },
        }
      );
      const res = await response.json();
      
      if (res.success) {
        toast.success(res.responseMessage, { position: "top-center" });
        setMyOffers(myOffers.filter(offer => offer.id !== offerId));
      } else {
        toast.error(res.responseMessage, { position: "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error", { position: "top-center" });
    }
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleString();
  };

  useEffect(() => {
    const getMyOffers = async () => {
      const offers = await retrieveMyOffers();
      if (offers) {
        setMyOffers(offers.offers);
      }
    };
    getMyOffers();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg">
        <div className="card-header text-dark">
          <h2 className="mb-0 text-center">My Bids</h2>
        </div>
        
        <div className="card-body">
          <div className="table-responsive" style={{ maxHeight: "65vh", overflowY: "auto" }}>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
                  <th scope="col">Bid Amount</th>
                  <th scope="col">Bid Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {myOffers.map((myOffer) => (
                  <tr key={myOffer.id}>
                    <td>
                      <img
                        src={`http://localhost:8080/api/product/${myOffer.product.image1}`}
                        className="img-thumbnail"
                        alt="product"
                        style={{ width: "80px", height: "60px", objectFit: "cover" }}
                      />
                    </td>
                    <td><b>{myOffer.product.name}</b></td>
                    <td>
                      <b>{`${myOffer.product.seller.firstName} ${myOffer.product.seller.lastName}`}</b>
                    </td>
                    <td><b>₹{myOffer.product.price}</b></td>
                    <td><b>₹{myOffer.amount}</b></td>
                    <td><b>{formatDateFromEpoch(myOffer.dateTime)}</b></td>
                    <td>
                      <span className={`badge ${
                        myOffer.status === "Active" ? "bg-success" :
                        myOffer.status === "Rejected" ? "bg-danger" :
                        "bg-secondary"
                      }`}>
                        <b>{myOffer.status}</b>
                      </span>
                    </td>
                    <td>
                      {myOffer.status === "Active" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteProductOffer(myOffer.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyBids;