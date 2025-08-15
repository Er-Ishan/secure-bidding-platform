import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link
          to="/user/customer/register"
          className="btn btn-primary mx-2 px-3 py-1"
        >
          Register Customer
        </Link>
      </li>

      <li className="nav-item">
        <Link 
          to="/user/login" 
          className="btn btn-outline-primary mx-2 px-3 py-1"
        >
          Login User
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;