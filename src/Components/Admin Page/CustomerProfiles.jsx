  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { TextField } from "@mui/material";
  import NavbarAdmin from "./NavbarAdmin";

  const CustomerProfiles = () => {

    const sessionId = localStorage.getItem("sessionId");

    const [customer, setCustomer] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const getCustomers = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5921/customer/getAllCustomers`
          );
          console.log(response);
          setCustomer(response.data);
        } catch (error) {
          console.error("Error fetching:", error);
        }
      };
      getCustomers();
    }, []);

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    const filteredHistory = customer.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.phone.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div style={{color:"white"}}>
        <div><NavbarAdmin/></div>
        <h1>Customer Profiles</h1>
        <br />
        <TextField
        fullWidth
        id="vehicleType"
        label="Search User"
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
          <table className="table table-bordered text-light">
            <thead>
              <tr>
                <th>Center ID</th>
                <th>Center Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default CustomerProfiles;