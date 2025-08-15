import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Platform Description */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Secure Bid Platform</h5>
            <p className="text-muted">
              Our online Secure bidding platform connects buyers and sellers in a transparent, 
              competitive, and secure environment. We empower users to place bids in real time, 
              ensuring fair pricing, faster transactions, and maximum value for every deal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">About Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none">Our Story</Link>
              </li>
              <li className="mb-2">
                <Link to="/team" className="text-white text-decoration-none">Team</Link>
              </li>
              <li className="mb-2">
                <Link to="/testimonials" className="text-white text-decoration-none">Testimonials</Link>
              </li>
              <li className="mb-2">
                <Link to="/press" className="text-white text-decoration-none">Press</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none">Contact Form</Link>
              </li>
              <li className="mb-2">
                <a href="mailto:support@securebid.com" className="text-white text-decoration-none">Email Us</a>
              </li>
              <li className="mb-2">
                <a href="tel:+1234567890" className="text-white text-decoration-none">Call: +1 (234) 567-890</a>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-white text-decoration-none">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/blog" className="text-white text-decoration-none">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/guides" className="text-white text-decoration-none">Guides</Link>
              </li>
              <li className="mb-2">
                <Link to="/help-center" className="text-white text-decoration-none">Help Center</Link>
              </li>
              <li className="mb-2">
                <Link to="/webinars" className="text-white text-decoration-none">Webinars</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link to="/security" className="text-white text-decoration-none">Security</Link>
              </li>
              <li className="mb-2">
                <Link to="/cookie-policy" className="text-white text-decoration-none">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center mb-4">
          <p className="mb-3">Ready to join our platform?</p>
          <Link to="/user/login">
            <button className="btn btn-outline-light px-4">
              Login / Register
            </button>
          </Link>
        </div>

        <hr className="my-4" />

        <div className="text-center text-muted">
          © {new Date().getFullYear()} SecureBid Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;