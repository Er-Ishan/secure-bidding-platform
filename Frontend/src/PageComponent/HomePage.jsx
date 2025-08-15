import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductComponent/ProductCard";

const HomePage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;

        if (categoryId == null && searchText === "") {
          response = await axios.get(
            `http://localhost:8080/api/product/fetch/all?status=Available`
          );
        } else if (searchText) {
          response = await axios.get(
            `http://localhost:8080/api/product/search?productName=${searchText}`
          );
        } else {
          response = await axios.get(
            `http://localhost:8080/api/product/fetch/category-wise?categoryId=${categoryId}`
          );
        }
        if (response.data) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, searchText]);

  const searchProducts = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  return (
    <div className="home-page" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Centered Hero Section */}
      <section className="hero-section py-5 text-center" style={{ 
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #eaeaea"
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold mb-4" style={{ color: "#2c3e50" }}>
                Secure Bidding Platform
              </h1>
              <p className="lead mb-4" style={{ color: "#6c757d" }}>
                Bid with confidence on our verified auctions. 
                Every transaction is secured with end-to-end encryption.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-primary px-4 py-2">
                  Start Bidding
                </button>
                <button className="btn btn-outline-secondary px-4 py-2">
                  How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section py-4 bg-white">
        <div className="container">
          <div className="row g-4 justify-content-center text-center">
            <div className="col-md-3">
              <div className="p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                <i className="bi bi-shield-lock fs-3 text-primary mb-2"></i>
                <h5 className="mb-1">Secure Payments</h5>
                <p className="small text-muted mb-0">256-bit encryption</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                <i className="bi bi-patch-check fs-3 text-primary mb-2"></i>
                <h5 className="mb-1">Verified Sellers</h5>
                <p className="small text-muted mb-0">Identity confirmed</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                <i className="bi bi-coin fs-3 text-primary mb-2"></i>
                <h5 className="mb-1">Fair Bidding</h5>
                <p className="small text-muted mb-0">Transparent process</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                <i className="bi bi-headset fs-3 text-primary mb-2"></i>
                <h5 className="mb-1">24/7 Support</h5>
                <p className="small text-muted mb-0">Dedicated help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "800px" }}>
                <div className="card-body p-4 text-center">
                  <h3 className="h5 mb-4">Find Your Next Auction</h3>
                  <form onSubmit={searchProducts} className="row g-2 justify-content-center">
                    <div className="col-md-9">
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="bi bi-search"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          placeholder="Search for products..."
                          onChange={(e) => setTempSearchText(e.target.value)}
                          value={tempSearchText}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Searching
                          </>
                        ) : (
                          "Search"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section py-5">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="text-center">
              <h2 className="h4 fw-bold mb-0">
                {searchText ? `Search Results for "${searchText}"` : 
                categoryId ? "Category Products" : "Featured Auctions"}
              </h2>
              {products.length > 0 && (
                <span className="badge bg-primary rounded-pill mt-2">
                  {products.length} items
                </span>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading auctions...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
              {products.map((product) => (
                <div className="col" key={product.id}>
                  <ProductCard item={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="py-4">
                <i className="bi bi-search display-5 text-muted mb-3"></i>
                <h4 className="text-muted">No auctions found</h4>
                <p className="text-muted">Try adjusting your search or browse our categories</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="h3 mb-4">Ready to start bidding?</h2>
          <p className="mb-4">Join thousands of satisfied buyers in our secure auction platform</p>
          <button className="btn btn-light px-4 py-2">Sign Up Now</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;