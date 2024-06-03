import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Importing modal components from React Bootstrap
import CustomerSelectedBill from "./CustomerSelectedBill";

const CustomerBill = () => {
  const sessionId = localStorage.getItem("sessionId");

  const [history, setHistory] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/bill/history/${sessionId}`
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

  return (
    <div className="" style={{ backgroundColor: "#1b2046", color: "white", height: "100vh" }}>
      <div>
        <NavBar />
      </div>
      <br />
      <div>
        <table className="table table-bordered" style={{ color: "white" }}>
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
            {history.map((product) => (
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
      {/* Modal for displaying selected bill */}
      <Modal show={showModal} onHide={handleCloseModal} style={{width:"100%"}}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Bill</Modal.Title>
        </Modal.Header>
        
          <CustomerSelectedBill selectedBill={selectedBill} style={{width:"300px"}}/>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerBill;
