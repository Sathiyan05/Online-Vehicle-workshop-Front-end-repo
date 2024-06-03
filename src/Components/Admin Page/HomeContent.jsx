import {
  Garage,
  Person2,
  ReceiptLong,
  UsbRounded,
  Warehouse,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";

const HomeContent = () => {
  const [customer, setCustomer] = useState([]);
  const [bill, setBill] = useState([]);
  const [serviceCenter, setServiceCenter] = useState([]);
  const [request, setRequest] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/bill/getAllBills`
        );
        console.log(response);
        setBill(response.data);
        const res = await axios.get(
          `http://localhost:5921/customer/getAllCustomers`
        );
        setCustomer(res.data);
        const service = await axios.get(
          `http://localhost:5921/serviceCenter/getApprovedCenter`
        );
        setServiceCenter(service.data);
        const requests = await axios.get(
          `http://localhost:5921/serviceCenter/getPendingCenter`
        );
        setRequest(requests.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getBills();
  }, []);

  return (
    <div className="container-fluid" style={{ height: "80vh" }}>
      <div>
        <NavbarAdmin/>
      </div>
      <div className="row d-flex flex-row" style={{ marginTop: "20px" }}>
        <div className="col-md-1"></div>
        <div
          className="col-md-4 d-flex"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "#3b5999",
          }}
        >
          <div className="d-flex align-center" style={{ marginTop: "7px" }}>
            <Garage style={{ fontSize: "60px" }} />
          </div>
          <div style={{ marginLeft: "30px", textAlign: "left" }}>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>
              Service Centers
            </div>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>{serviceCenter.length}</div>
          </div>
        </div>
        <div className="col-md-1 d-flex"></div>
        <div
          className="col-md-4 d-flex"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "#00acee",
          }}
        >
          <div className="d-flex align-center" style={{ marginTop: "7px" }}>
            <Person2 style={{ fontSize: "60px" }} />
          </div>
          <div style={{ marginLeft: "30px", textAlign: "left" }}>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>
              Customers
            </div>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>{customer.length}</div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row d-flex" style={{ marginTop: "20px" }}>
        <div className="col-md-1"></div>
        <div
          className="col-md-4 d-flex"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "#0076b4",
          }}
        >
          <div className="d-flex align-center" style={{ marginTop: "7px" }}>
            <Warehouse style={{ fontSize: "60px" }} />
          </div>
          <div style={{ marginLeft: "30px", textAlign: "left" }}>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>Requests</div>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>{request.length}</div>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div
          className="col-md-4 d-flex"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "#d44837",
          }}
        >
          <div className="d-flex align-center" style={{ marginTop: "7px" }}>
            <ReceiptLong style={{ fontSize: "60px" }} />
          </div>
          <div style={{ marginLeft: "30px", textAlign: "left" }}>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>
              Bills
            </div>
            <div style={{ fontSize: "30px", fontFamily: "serif" }}>{bill.length}</div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default HomeContent;
