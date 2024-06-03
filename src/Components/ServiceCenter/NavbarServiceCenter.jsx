import { AccountCircle, CircleNotifications, History, LockClock, Logout, PunchClock, ReceiptLong, SystemUpdate } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const NavbarServiceCenter = () => {

  const sessionId = localStorage.getItem("sessionId");
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceCenter/getserviceCenterById/${sessionId}`
        );
        console.log(response.data);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getCustomer();
  }, [sessionId]);



  const handleLogout = () => {
    localStorage.removeItem("sessionId");
  };

  return (
    <>
      <div className="container-fluid" style={{backgroundColor:"#1b2046", color:"white", paddingBottom:"10px"}}>
        <div className="row">
          <div className="col-md-5" style={{marginTop:"10px"}}>
            <h1 style={{fontFamily:"serif"}}>{customer.name}</h1>
          </div>
          <div className="col-md-7">
            <div className="row">

            
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#1b2046", color: "white", height: "8vh" }}
          >
            <a
              href={`/serviceCenterBills/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
             <ReceiptLong/> Bills
            </a>
          </div>
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#1b2046", color: "white", height: "8vh" }}
          >
            <a
              href={`/serviceCenterHistory/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
              <History/> History
            </a>
          </div>

          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#1b2046", color: "white", height: "8vh" }}
          >
            <a
              href={`/serviceRequests/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
             <CircleNotifications/> Requests
            </a>
          </div>

          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#1b2046", color: "white", height: "8vh" }}
          >
            <a
              href={`/serviceUpdateStatus/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
             <SystemUpdate/> Update
            </a>
          </div>
         
        
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#1b2046", color: "white", height: "8vh" }}
          >
            <a
              href={`/profileServiceCenter/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "24px",
              }}
            >
             <AccountCircle/> Profile
            </a>
          </div>
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#1b2046", color: "white", height: "8vh" }}
          >
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                  border: "none",
                }}
              >
               <Logout/> Logout
              </button>
            </a>
          </div>
        </div>
      </div>
      </div>
          </div>
    </>
  );
};

export default NavbarServiceCenter;
