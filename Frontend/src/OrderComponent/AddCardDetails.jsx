import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const priceToPay = location.state.priceToPay;
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });

  const handleCardInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const payForOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/order/add?userId=" + user.id,
        {
          method: "POST",
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
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(res.responseMessage, { position: "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error", { position: "top-center" });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0 text-center">Payment Details</h4>
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Total Amount:</h5>
                <h4 className="mb-0 text-primary">₹{priceToPay}</h4>
              </div>
              
              <form onSubmit={payForOrder}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label small text-muted mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="cardName"
                    onChange={handleCardInput}
                    value={card.cardName}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label small text-muted mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    name="cardNumber"
                    onChange={handleCardInput}
                    value={card.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validThrough" className="form-label small text-muted mb-1">
                      Valid Through
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validThrough"
                      name="validThrough"
                      onChange={handleCardInput}
                      value={card.validThrough}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <label htmlFor="cvv" className="form-label small text-muted mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      onChange={handleCardInput}
                      value={card.cvv}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary py-2"
                  >
                    Pay ₹{priceToPay}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCardDetails;