import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");
    setTimeout(() => {
      window.location.reload(true);
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="d-flex align-items-center gap-3">
      {/* Customer Links */}
      <div className="dropdown">
        <button 
          className="btn btn-outline-dark dropdown-toggle" 
          type="button" 
          id="customerDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="bi bi-person me-1"></i> My Account
        </button>
        <ul className="dropdown-menu" aria-labelledby="customerDropdown">
          <li>
            <Link className="dropdown-item" to="/customer/bid/all">
              <i className="bi bi-gem me-2"></i>My Bids
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/customer/order">
              <i className="bi bi-receipt me-2"></i>My Orders
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/customer/wallet">
              <i className="bi bi-wallet2 me-2"></i>My Wallet
            </Link>
          </li>
        </ul>
      </div>

      {/* Seller Links */}
      <div className="dropdown">
        <button 
          className="btn btn-outline-dark dropdown-toggle" 
          type="button" 
          id="sellerDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="bi bi-shop me-1"></i> Seller
        </button>
        <ul className="dropdown-menu" aria-labelledby="sellerDropdown">
          <li>
            <Link className="dropdown-item" to="/seller/order/all">
              <i className="bi bi-list-check me-2"></i>Orders
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/seller/product/all">
              <i className="bi bi-boxes me-2"></i>My Products
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/product/add">
              <i className="bi bi-plus-circle me-2"></i>Add Product
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link className="dropdown-item" to="/seller/delivery/register">
              <i className="bi bi-truck me-2"></i>Register Delivery
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/seller/delivery-person/all">
              <i className="bi bi-people me-2"></i>Delivery Persons
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <button 
        className="btn btn-outline-danger" 
        onClick={userLogout}
      >
        <i className="bi bi-box-arrow-right me-1"></i>Logout
      </button>

      <ToastContainer />
    </div>
  );
};

export default HeaderUser;