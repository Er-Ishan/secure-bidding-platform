import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      from_name: '',
      user_email: '',
      number: '',
      message: '',
    },
    validationSchema: Yup.object({
      from_name: Yup.string().min(4, 'Must be at least 4 characters').max(30).required('Required'),
      user_email: Yup.string().email('Invalid email address').required('Required'),
      number: Yup.string().min(10, 'Must be 10 digits').max(10).required('Required'),
      message: Yup.string().min(50, 'Must be at least 50 characters').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      emailjs
        .send('YOUR_SERVICE_KEY', 'YOUR_TEMPLATE_KEY', values, 'YOUR_PUBLIC_KEY')
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your message has been sent successfully!',
          });
          resetForm();
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to send message. Please try again later.',
          });
          console.error('Error:', error);
        });
    },
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h3 className="text-center text-primary mb-0">Contact Us</h3>
            </div>
            <div className="card-body p-4">
              <p className="text-muted text-center mb-4">
                Have questions? Our team is here to help. Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={formik.handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="from_name" className="form-label small text-muted mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${formik.touched.from_name && formik.errors.from_name ? 'is-invalid' : ''}`}
                        id="from_name"
                        name="from_name"
                        value={formik.values.from_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your full name"
                      />
                      {formik.touched.from_name && formik.errors.from_name && (
                        <div className="invalid-feedback">
                          {formik.errors.from_name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="user_email" className="form-label small text-muted mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className={`form-control ${formik.touched.user_email && formik.errors.user_email ? 'is-invalid' : ''}`}
                        id="user_email"
                        name="user_email"
                        value={formik.values.user_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="your@email.com"
                      />
                      {formik.touched.user_email && formik.errors.user_email && (
                        <div className="invalid-feedback">
                          {formik.errors.user_email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="number" className="form-label small text-muted mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${formik.touched.number && formik.errors.number ? 'is-invalid' : ''}`}
                        id="number"
                        name="number"
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="10-digit phone number"
                      />
                      {formik.touched.number && formik.errors.number && (
                        <div className="invalid-feedback">
                          {formik.errors.number}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label small text-muted mb-1">
                        Your Message
                      </label>
                      <textarea
                        className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : ''}`}
                        id="message"
                        name="message"
                        rows="4"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Type your message here (minimum 50 characters)"
                      />
                      {formik.touched.message && formik.errors.message && (
                        <div className="invalid-feedback">
                          {formik.errors.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <button 
                        type="submit" 
                        className="btn btn-primary py-2"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Sending...
                          </>
                        ) : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;