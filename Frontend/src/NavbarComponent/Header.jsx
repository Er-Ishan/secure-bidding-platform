import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories.categories);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={"https://cdn-icons-png.freepik.com/512/11503/11503110.png"}
              width="40"
              height="40"
              className="d-inline-block me-2"
              alt="Secure Bid Logo"
            />
            <span className="h4 mb-0 text-primary">SecureBid</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-medium px-3 text-dark"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu border-0 shadow">
                  {categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <Link
                          to={`/product/category/${category.id}/${category.name}`}
                          className="dropdown-item py-2 text-dark"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                    })}
                </ul>
              </li>
              
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link px-3 text-dark">
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contactus" className="nav-link px-3 text-dark">
                  Contact Us
                </Link>
              </li>
              
              <li className="nav-item">
                <Link to="/Blog" className="nav-link px-3 text-dark">
                  Blog
                </Link>
              </li>
            </ul>

            <div className="d-flex gap-2">  {/* Added gap between buttons */}
              <RoleNav />  {/* Ensure RoleNav buttons have proper styling */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;