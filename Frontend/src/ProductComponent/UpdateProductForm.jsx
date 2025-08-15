import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";

const UpdateProductForm = () => {
  const location = useLocation();
  const product = location.state;

  const [categories, setCategories] = useState([]);

  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const seller = JSON.parse(sessionStorage.getItem("active-customer"));

  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    getAllCategories();
  }, []);
  const [endDate, setEndDate] = useState("");

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [updatedProduct, setUpdatedProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    categoryId: product.categoryId,
    sellerId: product.sellerId,
    endDate: product.endDate,
  });

  const handleInput = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    let updatedEndDateInMillis;

    if (endDate !== "") {
      updatedEndDateInMillis = new Date(endDate).getTime();

      // Check if the conversion is a valid number
      if (isNaN(updatedEndDateInMillis)) {
        toast.error("Please select a valid expiration time.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      if (updatedEndDateInMillis < product.endDate) {
        toast.error("Expiration time cannot be reduced!!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }

      updatedProduct.endDate = updatedEndDateInMillis;
    }

    fetch("http://localhost:8080/api/product/update/detail", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + seller_jwtToken,
      },
      body: JSON.stringify(updatedProduct),
    })
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
              navigate("/seller/product/all");
            }, 2000); // Redirect after 3 seconds
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
              navigate("/seller/product/all");
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/seller/product/all");
            }, 2000); // Redirect after 3 seconds
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
        }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };

  const updateProductImage = (e) => {
    e.preventDefault();
    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("id", product.id);

    axios
      .put("http://localhost:8080/api/product/update/image", formData, {
        headers: {
          Authorization: "Bearer " + seller_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/seller/product/all");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
          }, 2000); // Redirect after 3 seconds
        } else {
          toast.error("It Seems Server is down!!!", {
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
          }, 2000); // Redirect after 3 seconds
        }
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
        }, 2000); // Redirect after 3 seconds
      });
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  return (
    <div className="container-fluid" style={{ 
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    }}>
      <div className="row" style={{ margin: "0 -10px" }}>
        {/* Left Column - Product Images */}
        <div className="col-md-3 mt-3">
          <div className="card shadow-lg" style={{ 
            borderRadius: "15px",
            border: "none",
            height: "100%",
            backgroundColor: "white"
          }}>
            <div style={{ padding: "15px" }}>
              <ProductCarousel
                item={{
                  image1: product.image1,
                  image2: product.image2,
                  image3: product.image3,
                }}
              />
            </div>
          </div>
        </div>

        {/* Middle Column - Product Details Form */}
        <div className="col-md-6 mt-3">
          <div className="card shadow-lg" style={{ 
            borderRadius: "15px",
            border: "none",
            height: "100%",
            backgroundColor: "white"
          }}>
            <div className="container-fluid">
              <div
                className="card-header text-center"
                style={{
                  borderRadius: "15px 15px 0 0",
                  backgroundColor: "#2c3e50",
                  color: "white",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  padding: "12px"
                }}
              >
                <h5 className="card-title mb-0">Update Product Details</h5>
              </div>
              <div className="card-body" style={{ padding: "20px" }}>
                <div className="text-center mb-4" style={{ color: "#495057" }}>
                  <b>
                    Product End Date:{" "}
                    <span style={{ color: "#dc3545", fontWeight: "600" }}>
                      {formatDateFromEpoch(product.endDate)}
                    </span>
                  </b>
                </div>

                <form className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="title" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Product Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="name"
                      onChange={handleInput}
                      value={updatedProduct.name}
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "0.95rem"
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="description" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Product Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      onChange={handleInput}
                      value={updatedProduct.description}
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "0.95rem",
                        minHeight: "120px"
                      }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Category
                    </label>
                    <select
                      name="categoryId"
                      onChange={handleInput}
                      className="form-control"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "0.95rem"
                      }}
                      value={updatedProduct.categoryId}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantity" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Product Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      onChange={handleInput}
                      value={updatedProduct.quantity}
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "0.95rem"
                      }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Product Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={handleInput}
                      value={updatedProduct.price}
                      readOnly
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "0.95rem",
                        backgroundColor: "#e9ecef"
                      }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiry" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Select Expiry Time
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="expiry"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "0.95rem"
                      }}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn"
                      onClick={saveProduct}
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 25px",
                        fontWeight: "500",
                        fontSize: "1rem",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Update Images Form */}
        <div className="col-md-3 mt-3">
          <div className="card shadow-lg" style={{ 
            borderRadius: "15px",
            border: "none",
            height: "100%",
            backgroundColor: "white"
          }}>
            <div className="container-fluid">
              <div
                className="card-header text-center"
                style={{
                  borderRadius: "15px 15px 0 0",
                  backgroundColor: "#2c3e50",
                  color: "white",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  padding: "12px"
                }}
              >
                <h5 className="card-title mb-0">Update Product Images</h5>
              </div>
              <div className="card-body" style={{ padding: "20px" }}>
                <form className="row">
                  <div className="mb-3">
                    <label htmlFor="image1" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Select 1st Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="image1"
                      name="image1"
                      onChange={(e) => setSelectImage1(e.target.files[0])}
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image2" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Select 2nd Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="image2"
                      name="image2"
                      onChange={(e) => setSelectImage2(e.target.files[0])}
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image3" className="form-label" style={{ fontWeight: "500", color: "#495057" }}>
                      Select 3rd Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="image3"
                      name="image3"
                      onChange={(e) => setSelectImage3(e.target.files[0])}
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn"
                      onClick={updateProductImage}
                      style={{
                        backgroundColor: "#17a2b8",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 25px",
                        fontWeight: "500",
                        fontSize: "1rem",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#138496"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#17a2b8"}
                    >
                      Update Images
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;