import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddCategoryForm = () => {
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Category title is required"),
    description: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Category description is required"),
  });

  const saveCategory = (values, { setSubmitting, resetForm }) => {
    fetch("http://localhost:8080/api/category/add", {
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
            autoClose: 1000,
          });
          setTimeout(() => navigate("/home"), 2000);
        } else {
          toast.error(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        toast.error("It seems the server is down", {
          position: "top-center",
          autoClose: 1000,
        });
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h4 className="text-center text-primary mb-0">Add New Category</h4>
            </div>
            <div className="card-body p-4">
              <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={saveCategory}
              >
                {({ isSubmitting }) => (
                  <Form className="row g-3">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label small text-muted mb-1">
                          Category Title
                        </label>
                        <Field 
                          type="text" 
                          className="form-control" 
                          id="name" 
                          name="name" 
                          placeholder="Enter category title" 
                        />
                        <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-4">
                        <label htmlFor="description" className="form-label small text-muted mb-1">
                          Category Description
                        </label>
                        <Field 
                          as="textarea" 
                          className="form-control" 
                          id="description" 
                          name="description" 
                          rows="4" 
                          placeholder="Enter detailed description" 
                        />
                        <ErrorMessage name="description" component="div" className="text-danger small mt-1" />
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
                              Adding...
                            </>
                          ) : 'Create Category'}
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

export default AddCategoryForm;