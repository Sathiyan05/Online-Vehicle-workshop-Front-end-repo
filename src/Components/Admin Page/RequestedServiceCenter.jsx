import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import NavbarAdmin from "./NavbarAdmin";

const RequestedServiceCenter = () => {
  const sessionId = localStorage.getItem("sessionId");

  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReasons, setSelectedReasons] = useState({});

  const handleReasonChange = (event, serviceId) => {
    setSelectedReasons({
      ...selectedReasons,
      [serviceId]: event.target.value,
    });
  };

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceCenter/getPendingCenter`
        );
        console.log(response);
        // Initialize selectedReasons state with default values for each service center
        const defaultReasons = {};
        response.data.forEach((service) => {
          defaultReasons[service.id] = "";
        });
        setSelectedReasons(defaultReasons);
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

  const handleApprove = async (service) => {
    try {
      service.status = "APPROVED";
      await axios.put(
        `http://localhost:5921/serviceCenter/update/${service.id}?adminId=${sessionId}`,
        service
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleReject = async (service) => {
    try {
      service.status = "REJECTED";
      service.reason = selectedReasons[service.id];
      await axios.put(
        `http://localhost:5921/serviceCenter/update/${service.id}?adminId=${sessionId}`,
        service
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const filteredHistory = history.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="conatiner-fluid"
      style={{ backgroundColor: "#1b2046", color: "white" }}
    >
      <div>
        <NavbarAdmin />
      </div>
      <h1>Service Center Requets</h1>
      <br />
      <TextField
        fullWidth
        id="vehicleType"
        label="Search Service Center Here"
        name="vehicleType"
        type="text"
        onChange={handleSearch}
        style={{ width: "40%" }}
        sx={{
          "& fieldset": {
            borderColor: "white",
          },
        }}
        inputProps={{ style: { color: "white" } }}
        InputLabelProps={{ style: { color: "white" } }} // Set style for label
      />

      <br />
      <br />
      <div className="container">
        <div className="row">
          {filteredHistory.map((service) => (
            <div className="col-md-4">
              <Card
                key={service.id}
                sx={{ mb: 2 }}
                style={{ backgroundColor: "#1b2046", color: "white" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    Center ID: {service.id}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Center Name: {service.name}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Email: {service.email}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Phone: {service.phone}
                  </Typography>
                  <Typography variant="body1" component="p">
                    GST Number: {service.gstNumber}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Location: {service.location}
                  </Typography>
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApprove(service)}
                  >
                    Approve
                  </button>
                  <br />
                  &nbsp;
                  <Select
                    fullWidth
                    sx={{
                      "& fieldset": {
                        borderColor: "white",
                      },
                    }}
                    id="vehicleType"
                    name="vehicleType"
                    type="text"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    value={selectedReasons[service.id]}
                    onChange={(event) => handleReasonChange(event, service.id)}
                    disabled={service.status !== "PENDING"}
                  >
                    <MenuItem value="">Select a reason</MenuItem>
                    <MenuItem value="Not Authorized">
                      Not an Authorized One
                    </MenuItem>
                    <MenuItem value="Not Eligible">
                      Not in Eligible criteria
                    </MenuItem>
                  </Select>
                  &nbsp;&nbsp;
                  <br />
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={
                      service.status !== "PENDING" ||
                      !selectedReasons[service.id]
                    }
                    onClick={() => handleReject(service)}
                  >
                    Reject
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RequestedServiceCenter;
