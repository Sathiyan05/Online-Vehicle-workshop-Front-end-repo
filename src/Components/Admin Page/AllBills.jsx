import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSelectedBill from "./AdminSelectedBill";
import NavbarAdmin from "./NavbarAdmin";
import { TextField } from "@mui/material";


const AllBills = () => {
  const sessionId = localStorage.getItem("sessionId");

  const [history, setHistory] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/bill/getAllBills`
        );
        console.log(response);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getHistory();
  }, []);

  const handleOpenModal = (bill) => {
    setSelectedBill(bill);
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHistory = history.filter((service) =>
  service.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

  

  return (
    <div style={{backgroundColor:"#1b2046", minHeight:"100vh"}}>
      <div><NavbarAdmin/></div>
      <br />
        <TextField
        fullWidth
        id="vehicleType"
        label="Search Bill"
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
      <br />
      <div>
        <table className="table table-bordered text-light">
          <thead>
            <tr>
              <th>Date</th>
              <th>Id</th>
              <th>Description</th>
              <th>Service Center</th>
              <th>Location</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((product) => (
              <tr key={product.id}>
                <td>{product.date}</td>
                <td>{product.id}</td>
                <td>{product.description}</td>
                <td>{product.serviceCenter.name}</td>
                <td>{product.serviceCenter.location}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenModal(product)}
                  >
                    Open Bill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBill && <AdminSelectedBill selectedBill={selectedBill} onCloseModal={handleCloseModal} />}
    </div>
  );
};

export default AllBills;