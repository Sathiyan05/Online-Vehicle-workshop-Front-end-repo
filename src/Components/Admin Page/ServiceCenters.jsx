import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import NavbarAdmin from "./NavbarAdmin";

const ServiceCenters = () => {
  const sessionId = localStorage.getItem("sessionId");

  const [history, setHistory] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceCenter/getApprovedCenter`
        );
        console.log(response);
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
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{color:"white"}}>
      <div><NavbarAdmin/></div>
      <h1>Service Centers</h1>
      <br />
      <TextField
      fullWidth
      id="vehicleType"
      label="Search Service Center Here"
      name="vehicleType"
        type="text"
        onChange={handleSearch}
        style={{width:"40%"}}
        sx={{
          "& fieldset": {
            borderColor: "white",
          },
        }}
        inputProps={{ style: { color: "white" } }}
        InputLabelProps={{ style: { color: "white" } }}
      />
      <br />
      <br />
      <div>
        <table className="table table-bordered" style={{color:"white"}}>
          <thead>
            <tr>
              <th>Center ID</th>
              <th>Center Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>GST Number</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.email}</td>
                <td>{service.phone}</td>
                <td>{service.gstNumber}</td>
                <td>{service.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceCenters;