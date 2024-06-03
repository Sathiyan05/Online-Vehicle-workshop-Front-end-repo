import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Importing modal components from React Bootstrap
import NavbarServiceCenter from "./NavbarServiceCenter";
import ServiceCenterSelectedBill from "./ServiceCenterSelectedBill";
import { TextField } from "@mui/material";


const ServiceCenterBills = () => {
  const sessionId = localStorage.getItem("sessionId");

  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/bill/serviceCenter/${sessionId}`
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
    setShowModal(true); // Show modal when a bill is selected
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
    setShowModal(false); // Close modal
  };

  const handleSearch = (event) => {
     setSearchTerm(event.target.value);
   };
 
   const filteredHistory = history.filter((service) =>
   service.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   service.customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
   service.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
     );

  return (
    <div className="" style={{ backgroundColor: "#1b2046", color: "white", height: "100vh" }}>
      <div>
        <NavbarServiceCenter />
      </div>
      <br />
      <div>
      <h1 style={{color:"white"}}>Update Service Status</h1>
        <TextField
          label="Customer Name, Bill Id"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "20px",width:"40%" }}
          sx={{
            "& fieldset": {
              borderColor: "white",
            },
            color:"white"
          }}
        />
        <br />
        <table className="table table-bordered" style={{ color: "white" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Id</th>
              <th>Description</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
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
                <td>{product.customer.id}</td>
                <td>{product.customer.name}</td>
                <td>{product.customer.location}</td>
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
      {/* Modal for displaying selected bill */}
      <Modal show={showModal} onHide={handleCloseModal} style={{width:"100%"}}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Bill</Modal.Title>
        </Modal.Header>
        
          <ServiceCenterSelectedBill selectedBill={selectedBill} style={{width:"300px"}}/> 
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceCenterBills;
