import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerHeader = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-seller"));

  const sellerLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-seller");
    sessionStorage.removeItem("seller-jwtToken");
    setTimeout(() => {
      window.location.reload(true);
      navigate("/home");
    }, 2000);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link
          to="/seller/order/all"
          className="nav-link text-dark"
        >
          <i className="bi bi-cart-check me-1"></i>Orders
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/seller/product/all"
          className="nav-link text-dark"
        >
          <i className="bi bi-box-seam me-1"></i>My Products
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/product/add" 
          className="nav-link text-dark"
        >
          <i className="bi bi-plus-circle me-1"></i>Add Product
        </Link>
      </li>
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle text-dark"
          to="#"
          id="deliveryDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-truck me-1"></i>Delivery
        </Link>
        <ul className="dropdown-menu" aria-labelledby="deliveryDropdown">
          <li>
            <Link 
              to="/seller/delivery/register" 
              className="dropdown-item"
            >
              Register Delivery
            </Link>
          </li>
          <li>
            <Link 
              to="/seller/delivery-person/all" 
              className="dropdown-item"
            >
              View Delivery Persons
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <button 
          className="btn btn-link nav-link text-dark p-0"
          onClick={sellerLogout}
        >
          <i className="bi bi-box-arrow-right me-1"></i>Logout
        </button>
      </li>
      <ToastContainer />
    </ul>
  );
};

export default SellerHeader;