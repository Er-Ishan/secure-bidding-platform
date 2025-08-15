import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const [role, setRole] = useState("");

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setRole("Customer");
    } else if (document.URL.indexOf("delivery") !== -1) {
      setRole("Delivery");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .required("Last Name is required"),
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is required"),
    uidNo: Yup.string()
      .matches(/^[0-9]{12}$/, "UID must be 12 digits")
      .required("UID is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Only letters allowed")
      .required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    values.role = role;
    if (role === "Delivery") {
      values.sellerId = seller?.id;
    }

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { autoClose: 1000 });
          setTimeout(() => navigate("/user/login"), 1000);
        } else {
          toast.error(res.responseMessage, { autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server error", { autoClose: 1000 }));

    setSubmitting(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h4 className="text-center text-primary mb-0">
                {role === "Customer" ? "Customer Registration" : role === "Delivery" ? "Delivery Personnel Registration" : "User Registration"}
              </h4>
            </div>
            <div className="card-body p-4">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  emailId: "",
                  password: "",
                  phoneNo: "",
                  uidNo: "",
                  street: "",
                  city: "",
                  pincode: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="row g-3">
                    {[
                      { label: "First Name", name: "firstName", type: "text", placeholder: "Enter your first name" },
                      { label: "Last Name", name: "lastName", type: "text", placeholder: "Enter your last name" },
                      { label: "Email Address", name: "emailId", type: "email", placeholder: "your@email.com" },
                      { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                      { label: "Contact Number", name: "phoneNo", type: "text", placeholder: "10-digit mobile number" },
                      { label: "UID Number", name: "uidNo", type: "text", placeholder: "12-digit UID number" },
                      { label: "Street Address", name: "street", type: "text", placeholder: "Your street address" },
                      { label: "City", name: "city", type: "text", placeholder: "Your city" },
                      { label: "Pincode", name: "pincode", type: "text", placeholder: "6-digit pincode" },
                    ].map((field, index) => (
                      <div key={index} className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor={field.name} className="form-label small text-muted mb-1">
                            {field.label}
                          </label>
                          <Field
                            type={field.type}
                            name={field.name}
                            className="form-control"
                            placeholder={field.placeholder}
                          />
                          <ErrorMessage name={field.name} component="div" className="text-danger small mt-1" />
                        </div>
                      </div>
                    ))}

                    <div className="col-12 mt-2">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary py-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Registering...
                            </>
                          ) : "Complete Registration"}
                        </button>
                      </div>
                    </div>

                    <div className="col-12 text-center mt-3">
                      <p className="small text-muted mb-0">
                        Already have an account?{" "}
                        <a href="/user/login" className="text-decoration-none">
                          Sign in here
                        </a>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserRegister;