import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import axios from "axios";
import { Modal, Button } from "@mui/material";
import { AccessTimeFilled, CloseFullscreen, DoorFront } from "@mui/icons-material";

const CustomerHistory = () => {
  const sessionId = localStorage.getItem("sessionId");
  const [history, setHistory] = useState([]);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceRequest/history/${sessionId}`
        );
        console.log(response.data);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getHistory();
  }, []);

  const handleOpenStatusModal = (status) => {
    setSelectedStatus(status);
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };

  return (
    <div className="conatiner-fluid" style={{backgroundColor:"#1b2046", color:"white", height:"100vh"}}>
      <div>
        <NavBar />
      </div>
      <br />
      <div>
        <table className="table table-bordered" style={{color:"white"}}>
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
            {history.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>{" "}
                <td>{product.faultInfo}</td> <td>{product.vehicleType}</td>{" "}
                <td>{product.serviceCenter.name}</td>{" "}
                <td>{product.serviceCenter.location}</td>{" "}
                <td>
                  {" "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenStatusModal(product.status)}
                  >
                    <AccessTimeFilled/> &nbsp;View Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={openStatusModal}
        onClose={handleCloseStatusModal}
        aria-labelledby="status-modal-title"
        aria-describedby="status-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "24",
          }}
        >
          <h2 id="status-modal-title">Request Status</h2>
          <p id="status-modal-description">{selectedStatus}</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseStatusModal}
          >
            <CloseFullscreen/>&nbsp;Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerHistory;
