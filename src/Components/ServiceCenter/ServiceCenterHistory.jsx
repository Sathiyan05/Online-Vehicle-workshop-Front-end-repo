import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import NavbarServiceCenter from "./NavbarServiceCenter";

const CustomerHistory = () => {
  const sessionId = localStorage.getItem("sessionId");
  const [history, setHistory] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `  http://localhost:5921/serviceRequest/allServiceCenterHistory/${sessionId}`
        );
        console.log(response.data);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getHistory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHistory = history.filter((service) =>
  service.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  service.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
  service.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
  service.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="conatiner-fluid" style={{backgroundColor:"#1b2046", color:"white", minHeight:"100vh"}}>
      <div>
        <NavbarServiceCenter />
      </div>
      <TextField
          label="Customer Name, Vehicle Type Service ID"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "20px", width:"40%" }}
          sx={{
            "& fieldset": {
              borderColor: "white",
            },
            color:"white"
          }}
        />
      <br />
      <div>
        <table className="table table-bordered text-light" >
          <thead>
            <tr>
              <th>Id</th>
              <th>Fault</th>
              <th>Vehicle</th>
              <th>Service Center</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="6">No history found</td>
              </tr>
            ) : (
              filteredHistory.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.faultInfo}</td>
                  <td>{product.vehicleType}</td>
                  <td>{product.customer.name}</td>
                  <td>{product.customer.location}</td>
                  <td>{product.status}</td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default CustomerHistory;
