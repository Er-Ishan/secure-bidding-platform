import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      const allCategories = await retrieveAllCategory();
      if (allCategories) {
        setAllCategories(allCategories.categories);
      }
    };
    getAllCategory();
  }, []);

  const retrieveAllCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    return response.data;
  };

  const deleteCategory = (categoryId) => {
    fetch(
      "http://localhost:8080/api/category/delete?categoryId=" + categoryId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center" });
          setAllCategories(allCategories.filter(cat => cat.id !== categoryId));
        } else {
          toast.error(res.responseMessage, { position: "top-center" });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Server error", { position: "top-center" });
      });
  };

  const updateCategory = (category) => {
    navigate("/admin/category/update", { state: category });
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 text-center">All Categories</h2>
        </div>
        
        <div className="card-body">
          <div className="table-responsive" style={{ maxHeight: "65vh", overflowY: "auto" }}>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map((category) => (
                  <tr key={category.id}>
                    <td><b>{category.id}</b></td>
                    <td><b>{category.name}</b></td>
                    <td className="text-truncate" style={{ maxWidth: "300px" }}>
                      <b>{category.description}</b>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => updateCategory(category)}
                        className="btn btn-sm btn-primary me-2"
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
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

export default ViewAllCategories;