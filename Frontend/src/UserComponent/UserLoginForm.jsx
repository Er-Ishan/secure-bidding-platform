import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const initialValues = {
    emailId: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    role: Yup.string()
      .oneOf(["Admin", "Customer", "Delivery"], "Invalid Role")
      .required("User Role is required"),
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const loginAction = (values, { setSubmitting }) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          if (res.jwtToken) {
            sessionStorage.setItem(`active-${res.user.role.toLowerCase()}`, JSON.stringify(res.user));
            sessionStorage.setItem(`${res.user.role.toLowerCase()}-jwtToken`, res.jwtToken);
            
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => {
              window.location.href = "/home";
            }, 1000);
          } else {
            toast.error(res.responseMessage, { position: "top-center", autoClose: 1000 });
          }
        } else {
          toast.error(res.responseMessage, { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => {
        toast.error("It seems server is down", { position: "top-center", autoClose: 1000 });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm border-0" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-header bg-white border-0 pt-4 pb-0">
          <h4 className="text-center text-primary mb-0">SecureBid Login</h4>
        </div>
        <div className="card-body p-4 pt-2">
          <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={loginAction}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label small text-muted mb-1">
                    Email Address
                  </label>
                  <Field 
                    type="email" 
                    className="form-control" 
                    name="emailId"
                    placeholder="your@email.com"
                  />
                  <ErrorMessage name="emailId" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label small text-muted mb-1">
                    Password
                  </label>
                  <Field 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="role" className="form-label small text-muted mb-1">
                    User Role
                  </label>
                  <Field 
                    as="select" 
                    name="role" 
                    className="form-select"
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Customer">Customer/Seller</option>
                    <option value="Delivery">Delivery</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-danger small mt-1" />
                </div>

                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : "Sign In"}
                  </button>
                </div>

                <div className="text-center small mt-3">
                  <p className="mb-1 text-muted">
                    New user?{' '}
                    <a href="/user/customer/register" className="text-decoration-none">
                      Create account
                    </a>
                  </p>
                  <a href="/forgot-password" className="text-muted text-decoration-none">
                    Forgot password?
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLoginForm;