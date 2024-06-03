import React, { useEffect, useState } from "react";
import NavbarServiceCenter from "./NavbarServiceCenter";
import axios from "axios";
import {
  CardContent,
  Typography,
  MenuItem,
  Select,
  Button,
  InputLabel,
} from "@mui/material";
import { Card } from "react-bootstrap";
import { Grid } from "@mui/material";

const ServiceCenterRequests = () => {
  // Get the session ID from local storage
  const sessionId = localStorage.getItem("sessionId");

  // Initialize state variables
  const [history, setHistory] = useState([]);
  const [reasons, setReasons] = useState({});

  // Fetch the pending service requests when the component mounts
  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceRequest/getpendingrequets/${sessionId}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getHistory();
  }, [sessionId]);

  const handleReasonChange = (event, serviceId) => {
    setReasons({
      ...reasons,
      [serviceId]: event.target.value,
    });
  };

  const handleApprove = async (service) => {
    try {
      const updatedService = { ...service, status: "APPROVED" };
      await axios.put(
        `http://localhost:5921/serviceRequest/update/${service.id}?scId=${sessionId}`,
        updatedService
      );
      alert("Request Approved");
      setHistory(
        history.map((s) => (s.id === service.id ? updatedService : s))
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleReject = async (service) => {
    try {
      const updatedService = {
        ...service,
        status: "REJECTED",
        reason: reasons[service.id],
      };
      await axios.put(
        `http://localhost:5921/serviceRequest/update/${service.id}?scId=${sessionId}`,
        updatedService
      );
      setHistory(
        history.map((s) => (s.id === service.id ? updatedService : s))
      );
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div
      className="conatiner-fluid"
      style={{ backgroundColor: "#1b2046", color: "white", minHeight: "100vh" }}
    >
      <div>
        <NavbarServiceCenter />
      </div>
      <br />
      <div className="container">
        <h1>Requests for Service</h1>
        <br />
        {history.length === 0 ? (
          <p>No Requests found</p>
        ) : (
          <Grid container spacing={2} textAlign={"left"}>
            {history.map((service) => (
              <Grid
                item
                key={service.id}
                style={{ color: "white", backgroundColor: "#1b2046" }}
              >
                <Card
                  style={{
                    backgroundColor: "#1b2046",
                    border: "1px solid white",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="p">
                      Description: {service.faultInfo}
                    </Typography>
                    <Typography variant="h6" component="p">
                      Vehicle Type: {service.vehicleType}
                    </Typography>
                    <Typography variant="h6" component="p">
                      Contact: {service.customer.phone}
                    </Typography>
                    <br />
                    <InputLabel id="dropdown-label" style={{ color: "white " }}>
                      Reject for
                    </InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      value={reasons[service.id] || ""}
                      onChange={(event) =>
                        handleReasonChange(event, service.id)
                      }
                      disabled={service.status !== "PENDING"}
                    >
                      <MenuItem value="">Select a reason</MenuItem>
                      <MenuItem value="Stock Not Available">
                        Stock Not Available
                      </MenuItem>
                      <MenuItem value="Natural Calamities">
                        Natural Calamities
                      </MenuItem>
                      <MenuItem value="Temporarily closed">
                        Unable to Process Temporarily
                      </MenuItem>
                    </Select>
                    <br />
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApprove(service)}
                    >
                      Approve
                    </button>
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={
                        service.status !== "PENDING" || !reasons[service.id]
                      }
                      onClick={() => handleReject(service)}
                    >
                      Reject
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default ServiceCenterRequests;
