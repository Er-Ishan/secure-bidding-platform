import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllCustomers = () => {
  const [allCustomer, setAllCustomer] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Customer",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    return response.data;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllCustomer(allUsers.users);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 text-center">All Customers</h2>
        </div>
        
        <div className="card-body">
          <div className="table-responsive" style={{ maxHeight: "65vh", overflowY: "auto" }}>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {allCustomer.map((customer) => (
                  <tr key={customer.id}>
                    <td><b>{customer.firstName}</b></td>
                    <td><b>{customer.lastName}</b></td>
                    <td><b>{customer.emailId}</b></td>
                    <td><b>{customer.phoneNo}</b></td>
                    <td>
                      <b>
                        {customer.address?.street && customer.address?.city && customer.address?.pincode 
                          ? `${customer.address.street}, ${customer.address.city}, ${customer.address.pincode}`
                          : "N/A"}
                      </b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCustomers;