import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyWallet = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [walletAmount, setWalletAmount] = useState(user.walletAmount);
  const [walletRequest, setWalletRequest] = useState({
    id: user.id,
    walletAmount: "",
  });

  useEffect(() => {
    const getMyWallet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/fetch/user-id?userId=${user.id}`
        );
        if (response.data && response.data.users.length > 0) {
          setWalletAmount(response.data.users[0].walletAmount);
        }
      } catch (error) {
        console.error("Error fetching wallet data", error);
        toast.error("Failed to fetch wallet details");
      }
    };
    getMyWallet();
  }, []);

  const handleInput = (e) => {
    setWalletRequest({ ...walletRequest, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const amount = parseInt(walletRequest.walletAmount) * 100; // Convert to paise
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const options = {
      key: "rzp_test_9C5DF9gbJINYTA",
      amount: amount,
      currency: "INR",
      name: "MyWallet App",
      description: "Add Money to Wallet",
      handler: async function (response) {
        try {
          const updateResponse = await axios.put(
            "http://localhost:8080/api/user/update/wallet",
            {
              id: user.id,
              walletAmount: parseFloat(walletRequest.walletAmount),
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (updateResponse.data.success) {
            toast.success("Money added successfully!");
            setWalletAmount(updateResponse.data.updatedWalletAmount);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error(updateResponse.data.responseMessage || "Failed to update wallet.");
          }
        } catch (error) {
          console.error("Error updating wallet", error);
          toast.error(error.response?.data?.responseMessage || "Transaction successful, but wallet update failed.");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="admin-container" style={{
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <div className="d-flex aligns-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="card shadow-lg" style={{ 
          width: "100%",
          maxWidth: "450px",
          borderRadius: "15px",
          border: "none",
          overflow: "hidden"
        }}>
          <div
            className="card-header text-center text-dark"
            style={{
              padding: "20px",
              fontSize: "1.5rem",
              fontWeight: "600"
            }}
          >
            <h3 style={{ margin: 0 }}>Wallet Balance</h3>
          </div>
          
          <div className="card-body text-center" style={{ padding: "30px 20px" }}>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#28a745",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ marginRight: "10px" }}>₹</span>
              <span>{walletAmount}</span>
            </div>

            <div className="divider" style={{
              height: "1px",
              backgroundColor: "#e9ecef",
              margin: "25px 0"
            }}></div>

            <div
              className="card-header text-center text-dark mb-4"
              style={{
                padding: "15px",
                borderRadius: "8px",
                fontSize: "1.25rem",
                fontWeight: "500"
              }}
            >
              Add Money to Wallet
            </div>

            <form>
              <div className="mb-4">
                <label className="form-label" style={{
                  display: "block",
                  textAlign: "left",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#495057"
                }}>
                  Amount (₹)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="walletAmount"
                  onChange={handleInput}
                  value={walletRequest.walletAmount}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    fontSize: "1rem",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter amount"
                />
              </div>
              
              <div className="d-flex justify-content-center mt-4">
                <button
                  type="button"
                  className="btn"
                  onClick={handlePayment}
                  disabled={!walletRequest.walletAmount}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 30px",
                    fontSize: "1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: "100%",
                    maxWidth: "200px",
                    opacity: walletRequest.walletAmount ? 1 : 0.7
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                >
                  Add Money
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default MyWallet;