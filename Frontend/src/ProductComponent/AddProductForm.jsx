import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category/fetch/all");
        if (response.data) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Product title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    quantity: Yup.number().required("Quantity is required").min(1, "At least 1 quantity is required"),
    categoryId: Yup.string().required("Category is required"),
    endDate: Yup.date().required("Expiry time is required"),
    image1: Yup.mixed().required("First image is required"),
    image2: Yup.mixed().required("Second image is required"),
    image3: Yup.mixed().required("Third image is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!seller) {
      toast.error("Seller Id is missing!!!");
      return;
    }

    const formData = new FormData();
    formData.append("image1", values.image1);
    formData.append("image2", values.image2);
    formData.append("image3", values.image3);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("categoryId", values.categoryId);
    formData.append("sellerId", seller.id);
    formData.append("endDate", new Date(values.endDate).getTime());

    try {
      const response = await axios.post("http://localhost:8080/api/product/add", formData, {
        headers: { Authorization: "Bearer " + seller_jwtToken },
      });
      
      if (response.data.success) {
        toast.success(response.data.responseMessage);
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(response.data.responseMessage);
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("It seems server is down");
      setTimeout(() => window.location.reload(), 2000);
    }
    setSubmitting(false);
  };

  return (
    <div className="admin-container" style={{
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <div className="d-flex aligns-items-center justify-content-center">
        <div className="card shadow-lg" style={{ 
          width: "100%",
          maxWidth: "800px",
          borderRadius: "15px",
          border: "none",
          overflow: "hidden"
        }}>
          <div className="card-header text-center text-dark" style={{
            padding: "10px",
            fontSize: "1.5rem",
            fontWeight: "400"
          }}>
            <h3 style={{ margin: 0 }}>Add New Product</h3>
          </div>
          
          <div className="card-body" style={{ padding: "30px" }}>
            <Formik
              initialValues={{ name: "", description: "", price: "", quantity: "", categoryId: "", endDate: "", image1: null, image2: null, image3: null }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label" style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#495057"
                    }}>
                      Product Title
                    </label>
                    <Field 
                      type="text" 
                      className="form-control" 
                      name="name" 
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "1rem",
                        transition: "border-color 0.3s ease"
                      }}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" style={{ 
                      marginTop: "5px", 
                      fontSize: "0.875rem" 
                    }} />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label" style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#495057"
                    }}>
                      Product Description
                    </label>
                    <Field 
                      as="textarea" 
                      className="form-control" 
                      name="description" 
                      rows="3" 
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "1rem",
                        transition: "border-color 0.3s ease",
                        minHeight: "120px"
                      }}
                    />
                    <ErrorMessage name="description" component="div" className="text-danger" style={{ 
                      marginTop: "5px", 
                      fontSize: "0.875rem" 
                    }} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#495057"
                    }}>
                      Category
                    </label>
                    <Field 
                      as="select" 
                      className="form-control" 
                      name="categoryId"
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "1rem",
                        transition: "border-color 0.3s ease",
                        appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "16px 12px"
                      }}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="categoryId" component="div" className="text-danger" style={{ 
                      marginTop: "5px", 
                      fontSize: "0.875rem" 
                    }} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#495057"
                    }}>
                      Product Quantity
                    </label>
                    <Field 
                      type="number" 
                      className="form-control" 
                      name="quantity" 
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "1rem",
                        transition: "border-color 0.3s ease"
                      }}
                    />
                    <ErrorMessage name="quantity" component="div" className="text-danger" style={{ 
                      marginTop: "5px", 
                      fontSize: "0.875rem" 
                    }} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#495057"
                    }}>
                      Product Price (₹)
                    </label>
                    <Field 
                      type="number" 
                      className="form-control" 
                      name="price" 
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "1rem",
                        transition: "border-color 0.3s ease"
                      }}
                    />
                    <ErrorMessage name="price" component="div" className="text-danger" style={{ 
                      marginTop: "5px", 
                      fontSize: "0.875rem" 
                    }} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#495057"
                    }}>
                      Expiry Time
                    </label>
                    <Field 
                      type="datetime-local" 
                      className="form-control" 
                      name="endDate" 
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "1rem",
                        transition: "border-color 0.3s ease"
                      }}
                    />
                    <ErrorMessage name="endDate" component="div" className="text-danger" style={{ 
                      marginTop: "5px", 
                      fontSize: "0.875rem" 
                    }} />
                  </div>

                  {['image1', 'image2', 'image3'].map((img, index) => (
                    <div className="col-md-6" key={index}>
                      <label className="form-label" style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#495057"
                      }}>
                        {`Image ${index + 1}`}
                      </label>
                      <input 
                        type="file" 
                        className="form-control" 
                        onChange={e => setFieldValue(img, e.target.files[0])}
                        style={{
                          width: "100%",
                          padding: "12px 15px",
                          borderRadius: "8px",
                          border: "1px solid #ced4da",
                          fontSize: "1rem",
                          transition: "border-color 0.3s ease"
                        }}
                      />
                      <ErrorMessage name={img} component="div" className="text-danger" style={{ 
                        marginTop: "5px", 
                        fontSize: "0.875rem" 
                      }} />
                    </div>
                  ))}

                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button 
                      type="submit" 
                      className="btn" 
                      disabled={isSubmitting}
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
                        maxWidth: "250px",
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                      onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = "#218838")}
                      onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = "#28a745")}
                    >
                      {isSubmitting ? "Adding..." : "Add Product"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
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

export default AddProductForm;