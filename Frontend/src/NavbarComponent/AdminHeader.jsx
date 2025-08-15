import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-admin"));

  const adminLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    setTimeout(() => {
      window.location.reload(true);
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="d-flex align-items-center gap-3">
      {/* Admin Dropdown */}
      <div className="dropdown">
        <button 
          className="btn btn-outline-dark dropdown-toggle" 
          type="button" 
          id="adminDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="bi bi-gear me-1"></i> Admin Controls
        </button>
        <ul className="dropdown-menu" aria-labelledby="adminDropdown">
          <li>
            <Link className="dropdown-item" to="/user/admin/register">
              <i className="bi bi-person-plus me-2"></i>Register Admin
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/category/add">
              <i className="bi bi-tags me-2"></i>Add Category
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link className="dropdown-item" to="/admin/order/all">
              <i className="bi bi-list-check me-2"></i>All Orders
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/product/all">
              <i className="bi bi-box-seam me-2"></i>All Products
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/category/all">
              <i className="bi bi-collection me-2"></i>All Categories
            </Link>
          </li>
        </ul>
      </div>

      {/* Users Dropdown */}
      <div className="dropdown">
        <button 
          className="btn btn-outline-dark dropdown-toggle" 
          type="button" 
          id="usersDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="bi bi-people me-1"></i> User Management
        </button>
        <ul className="dropdown-menu" aria-labelledby="usersDropdown">
          <li>
            <Link className="dropdown-item" to="/admin/delivery-person/all">
              <i className="bi bi-truck me-2"></i>All Deliveries
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/customer/all">
              <i className="bi bi-person-lines-fill me-2"></i>View Customers
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <button 
        className="btn btn-outline-danger" 
        onClick={adminLogout}
      >
        <i className="bi bi-box-arrow-right me-1"></i>Logout
      </button>

      <ToastContainer />
    </div>
  );
};

export default AdminHeader;