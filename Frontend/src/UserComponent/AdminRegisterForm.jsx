import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AdminRegisterForm = () => {
  let navigate = useNavigate();
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const initialValues = {
    emailId: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const registerAdmin = (values, { setSubmitting }) => {
    fetch("http://localhost:8080/api/user/admin/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(values),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { 
            position: "top-center", 
            autoClose: 1000 
          });
          setTimeout(() => navigate("/home"), 1000);
        } else {
          toast.error(res.responseMessage, { 
            position: "top-center", 
            autoClose: 1000 
          });
        }
      })
      .catch(() => {
        toast.error("It seems server is down", { 
          position: "top-center", 
          autoClose: 1000 
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h4 className="text-center text-primary mb-0">Register New Admin</h4>
            </div>
            <div className="card-body p-4">
              <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={registerAdmin}
              >
                {({ isSubmitting }) => (
                  <Form className="row g-3">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="emailId" className="form-label small text-muted mb-1">
                          Email Address
                        </label>
                        <Field 
                          type="email" 
                          className="form-control" 
                          id="emailId" 
                          name="emailId" 
                          placeholder="admin@example.com" 
                        />
                        <ErrorMessage 
                          name="emailId" 
                          component="div" 
                          className="text-danger small mt-1" 
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label small text-muted mb-1">
                          Password
                        </label>
                        <Field 
                          type="password" 
                          className="form-control" 
                          id="password" 
                          name="password" 
                          placeholder="••••••••" 
                          autoComplete="new-password"
                        />
                        <ErrorMessage 
                          name="password" 
                          component="div" 
                          className="text-danger small mt-1" 
                        />
                      </div>
                    </div>

                    <div className="col-12">
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
                          ) : 'Register Admin'}
                        </button>
                      </div>
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

export default AdminRegisterForm;