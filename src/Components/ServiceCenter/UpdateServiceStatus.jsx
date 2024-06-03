import React, { useEffect, useState } from "react";
import NavbarServiceCenter from "./NavbarServiceCenter";
import axios from "axios";
import {
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { Card } from "react-bootstrap";
import { Grid } from "@mui/material";

const UpdateServiceStatus = () => {
  const sessionId = localStorage.getItem("sessionId");
  const [history, setHistory] = useState([]);
  const [dropdownValues, setDropdownValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceRequest/getapprovedrequets/${sessionId}`
        );
        console.log(response);
        setHistory(response.data);
        const initialDropdownValues = {};
        response.data.forEach((service) => {
          initialDropdownValues[service.id] = "";
        });
        setDropdownValues(initialDropdownValues);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getHistory();
  }, [sessionId]);

  const handleUpdate = async (service) => {
    try {
      service.status = "WORKING";
      service.progress = dropdownValues[service.id];
      await axios.put(
        `http://localhost:5921/serviceRequest/update/${service.id}?scId=${sessionId}`,
        service
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  

  const handleDropdownChange = (serviceId, event) => {
    setDropdownValues({
      ...dropdownValues,
      [serviceId]: event.target.value,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHistory = history.filter((service) =>
  service.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  service.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
  service.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="conatiner-fluid" style={{backgroundColor:"#1b2046", color:"white", minHeight:"100vh"}}>
      <div>
        <NavbarServiceCenter />
      </div>
      <br />
      <div className="container">
        <h1 style={{color:"white"}}>Update Service Status</h1>
        <TextField
          label="Customer Name, Vehicle Type Service ID"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "20px" }}
          sx={{
            "& fieldset": {
              borderColor: "white",
            },
            color:"white"
          }}
        />
        <br />
        <Grid container spacing={2} textAlign={"left"} fontFamily={"serif"}>
          {filteredHistory.map((service) => (
            <Grid item xs={4} key={service.id} style={{color:"white", backgroundColor:"#1b2046"}}>
              <Card style={{backgroundColor:"#1b2046", border:"1px solid white" }}>
                <CardContent>
                  <Typography variant="h6" component="p">
                    <b>Service Id:</b> {service.id}
                  </Typography>
                  <Typography variant="h6" component="p">
                    <b>Description:</b> {service.faultInfo}
                  </Typography>
                  <Typography variant="h6" component="p">
                    <b>Vehicle Type: </b> {service.vehicleType}
                  </Typography>
                  <Typography variant="h6" component="p">
                    <b>Current Progress: </b> {service.progress}
                  </Typography>
                  <Typography variant="h6" component="p">
                    <b>Customer: </b> {service.customer.name}
                  </Typography>
                  <Typography variant="h6" component="p">
                    <b>Customer ID: </b> {service.customer.id}
                  </Typography>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(service);
                    }}
                  >
                    <br></br>
                    {!(
                      service.faultInfo === "FC Service" ||
                      service.faultInfo === "Engine Overheating" ||
                      service.faultInfo === "Brake Issues" ||
                      service.faultInfo === "Electrical Fault" ||
                      service.faultInfo === "Suspension Problem"
                    ) && (
                      <FormControl fullWidth>
                        <InputLabel id="dropdown-label">Status</InputLabel>
                        <Select
                          required
                          labelId="status"
                          label="Status"
                          value={dropdownValues[service.id] || ""}
                          onChange={(e) => handleDropdownChange(service.id, e)}
                          sx={{
                            "& fieldset": {
                              borderColor: "white",
                            },
                          }}
                        >
                          <MenuItem value="Working">Working</MenuItem>
                          <MenuItem value="Deliver Soon">Deliver Soon</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    {service.faultInfo === "FC Service" && (
                      <FormControl fullWidth>
                        <InputLabel id="dropdown-label">Status</InputLabel>
                        <Select
                          required
                          labelId="status"
                          label="Status"
                          value={dropdownValues[service.id] || ""}
                          onChange={(e) => handleDropdownChange(service.id, e)}
                          sx={{
                            "& fieldset": {
                              borderColor: "white",
                            },
                          }}
                        >
                          <MenuItem value="Painting work">
                            Painting work
                          </MenuItem>
                          <MenuItem value="Patty Works">Patty Works</MenuItem>
                          <MenuItem value="Tinkering works">
                            Tinkering works
                          </MenuItem>
                          <MenuItem value="Deliver Soon">Deliver soon</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    {service.faultInfo === "Engine Overheating" && (
                      <FormControl fullWidth>
                        <InputLabel id="dropdown-label">Status</InputLabel>
                        <Select
                          required
                          labelId="status"
                          label="Status"
                          value={dropdownValues[service.id] || ""}
                          onChange={(e) => handleDropdownChange(service.id, e)}
                          sx={{
                            "& fieldset": {
                              borderColor: "white",
                            },
                          }}
                        >
                          <MenuItem value="Working">Working</MenuItem>
                          <MenuItem value="Deliver Soon">Deliver Soon</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    {service.faultInfo === "Brake Issues" && (
                      <FormControl fullWidth>
                        <InputLabel id="dropdown-label">Status</InputLabel>
                        <Select
                          required
                          labelId="status"
                          label="Status"
                          value={dropdownValues[service.id] || ""}
                          onChange={(e) => handleDropdownChange(service.id, e)}
                          sx={{
                            "& fieldset": {
                              borderColor: "white",
                            },
                          }}
                        >
                          <MenuItem value="Working">Working</MenuItem>
                          <MenuItem value="Deliver Soon">Deliver Soon</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    {service.faultInfo === "Electrical Fault" && (
                      <FormControl fullWidth>
                        <InputLabel id="dropdown-label">Status</InputLabel>
                        <Select
                          required
                          labelId="status"
                          label="Status"
                          value={dropdownValues[service.id] || ""}
                          onChange={(e) => handleDropdownChange(service.id, e)}
                          sx={{
                            "& fieldset": {
                              borderColor: "white",
                            },
                          }}
                        >
                          <MenuItem value="Working">Working</MenuItem>
                          <MenuItem value="Deliver Soon">Deliver Soon</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    {service.faultInfo === "Suspension Problem" && (
                      <FormControl fullWidth>
                        <InputLabel id="dropdown-label">Status</InputLabel>
                        <Select
                          required
                          labelId="status"
                          label="Status"
                          value={dropdownValues[service.id] || ""}
                          onChange={(e) => handleDropdownChange(service.id, e)}
                          sx={{
                            "& fieldset": {
                              borderColor: "white",
                            },
                          }}
                        >
                          <MenuItem value="Working">Working</MenuItem>
                          <MenuItem value="Deliver Soon">Deliver Soon</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    <br />
                    <br></br>
                    <center>
                      {
                        service.status === "Deliver Soon" 
                      }
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ width: "50%", fontSize: "18px" }}
                      >
                        Update
                      </button>
                    </center>
                  </form>
                  <br />
                  {service.progress === "Deliver Soon" && (
                    <center>
                      <a
                        href={`/generateBill/${sessionId}/${service.id}/${service.faultInfo}/${service.customer.id}`}
                      >
                        <button
                          className="btn btn-secondary"
                          style={{ width: "50%", fontSize: "18px" }}
                        >
                          Generate Bill
                        </button>
                      </a>
                    </center>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default UpdateServiceStatus;
