import { AccountCircle, BookOnlineOutlined, History, LocalActivity, LogoutOutlined, ReceiptLong } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [openLocationModel, setOpenLocationModel] = useState(false);
  const [location, setLocation] = useState();
  const [locationList, setLocationList] = useState([]);
  const [serviceCenter, setServiceCenter] = useState([]);
  const [serviceCenterId, setServiceCenterId] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [formData, setFormData] = useState({
    faultInfo: "",
    vehicleType: "",
    status: "PENDING",
    progress: "NA",
    reason: "NA",
  });
  const [loading, setLoading] = useState(false);

  const distinctLocations = [
    ...new Set(locationList.map((center) => center.location)),
  ];

  const handleOpenLocationModel = () => {
    setOpenLocationModel(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
  };

  const handleCloseLocationModel = () => {
    setOpenLocationModel(false);
  };

  const sessionId = localStorage.getItem("sessionId");

  const createRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5921/serviceRequest/register?cId=${sessionId}&scId=${serviceCenterId}`,
        formData
      );
      console.log(response.data);
      setFormData({
        faultInfo: "",
        vehicleType: "",
        status: "PENDING",
        progress: "NA",
        reason: "NA",
      });
      setOpenSnackBar(true); // Open Snackbar after successful submission
      setTimeout(() => {
        setLoading(false);
        setOpenSnackBar(false); // Close Snackbar after 2 seconds
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error Inserting the record:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceCenter/getAllCenter`
        );
        console.log(response.data);
        setLocationList(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getLocation();
  }, []);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    if (location) {
      const getServiceCenter = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5921/serviceCenter/getByLocation/${location}`
          );
          console.log(response.data);
          setServiceCenter(response.data);
        } catch (error) {
          console.error("Error fetching:", error);
        }
      };
      getServiceCenter();
    }
  }, [location]);

  return (
    <>
      <Snackbar
        open={openSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackBar(false)}>
          Request Sent Successfully
        </Alert>
      </Snackbar>
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div
            className="col-md-12 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#f15322",
              height: "10vh",
              fontSize: "30px",
              fontWeight: "bolder",
              color: "white",
            }}
          >
            Auto Care
          </div>
        </div>

        <div className="row">
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{
              backgroundColor: "black",
              color: "white",
              height: "8vh",
              fontSize: "36px",
              fontFamily: "serif",
            }}
          >
            <span style={{ color: "#f15322" }}>A</span>U
            <span style={{ color: "#f15322" }}>T</span>O &nbsp;
            <span style={{ color: "#f15322" }}>C</span>A
            <span style={{ color: "#f15322" }}> R </span>E
          </div>
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "black", color: "white", height: "8vh" }}
          >
            <a
              href={`/serviceHistory/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
                fontFamily: "serif",
              }}
            >
              <History /> History
            </a>
          </div>
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "black", color: "white", height: "8vh" }}
          >
            <button
              onClick={handleOpenLocationModel}
              style={{
                backgroundColor: "transparent",
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
                border: "none",
                fontFamily: "serif",
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <LocalActivity /> Raise Request
                </>
              )}
            </button>
          </div>

          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "black", color: "white", height: "8vh" }}
          >
            <a
              href={`/customerBill/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
                fontFamily: "serif",
              }}
            >
              <ReceiptLong /> View Bill
            </a>
          </div>
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "black", color: "white", height: "8vh" }}
          >
            <a
              href={`/profileCustomer/${sessionId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "24px",
                fontFamily: "serif",
              }}
            >
              <AccountCircle /> Profile
            </a>
          </div>
          <div
            className="col-md-2 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "black", color: "white", height: "8vh" }}
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
                  fontFamily: "serif",
                }}
              >
                <LogoutOutlined />Logout
              </button>
            </a>
          </div>
        </div>
      </div>
      <Modal
        open={openLocationModel}
        onClose={handleCloseLocationModel}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "20px",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: "20px",
            width: "50%",
            minHeight: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "white", fontFamily: "serif" }}>
            Enter Request Details
          </h2>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createRequest();
            }}
          >
            <center>
              <FormControl
                style={{ width: "400px", marginBottom: "20px", color: "white" }}
              >
                <InputLabel
                  id="fault-information-label"
                  style={{ color: "white" }}
                >
                  Fault Information
                </InputLabel>
                <Select
                  required
                  labelId="fault-information-label"
                  id="faultInformation"
                  name="faultInfo"
                  label="Fault Information"
                  value={formData.faultInfo}
                  onChange={handleInputChange}
                  sx={{
                    "& fieldset": {
                      borderColor: "white",
                    },
                    color: "white",
                  }}
                  inputProps={{ style: { color: "white" } }}
                >
                  <MenuItem value="" style={{ backgroundColor: "" }}>
                    Select an option
                  </MenuItem>
                  <MenuItem value="Engine Overheating">
                    Engine Overheating
                  </MenuItem>
                  <MenuItem value="Transmission Failure">
                    Transmission Failure
                  </MenuItem>
                  <MenuItem value="Brake Issues">Brake Issues</MenuItem>
                  <MenuItem value="Electrical Fault">Electrical Fault</MenuItem>
                  <MenuItem value="Suspension Problems">
                    Suspension Problems
                  </MenuItem>
                  <MenuItem value="FC Service">FC Service</MenuItem>
                  <MenuItem value="Other">Others</MenuItem>
                </Select>
              </FormControl>
              <br />
              <FormControl
                fullWidth
                style={{ width: "400px", marginBottom: "20px" }}
              >
                <InputLabel
                  id="vehicle-type-label"
                  style={{ color: "white" }}
                >
                  Vehicle
                </InputLabel>
                <Select
                  required
                  variant="outlined"
                  id="vehicleType"
                  name="vehicleType"
                  label="Vehicle"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  sx={{
                    "& fieldset": {
                      borderColor: "white",
                    },
                    color: "white",
                  }}
                  inputProps={{ style: { color: "white" } }}
                >
                  <MenuItem value="">Select an option</MenuItem>
                  <MenuItem value="KIA">KIA</MenuItem>
                  <MenuItem value="Hyundai">Hyundai</MenuItem>
                  <MenuItem value="Bolero">Bolero</MenuItem>
                  <MenuItem value="Tata">Tata</MenuItem>
                  <MenuItem value="Suzuki">Suzuki</MenuItem>
                  <MenuItem value="Audi">Audi</MenuItem>
                  <MenuItem value="Benz">Benz</MenuItem>
                  <MenuItem value="Jaguar">Jaguar</MenuItem>
                  <MenuItem value="BMW">BMW</MenuItem>
                  <MenuItem value="Mahendra">Mahendra</MenuItem>
                </Select>
              </FormControl>
              <br />
              <FormControl
                style={{ width: "400px", marginBottom: "20px" }}
              >
                <InputLabel
                  id="location-label"
                  style={{ color: "white" }}
                >
                  Location
                </InputLabel>
                <Select
                  labelId="location-label"
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={handleLocationChange}
                  sx={{
                    "& fieldset": {
                      borderColor: "white",
                    },
                    color: "white",
                  }}
                  inputProps={{ style: { color: "white" } }}
                >
                  {distinctLocations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl
                style={{ width: "400px", marginBottom: "20px" }}
              >
                <InputLabel
                  id="service-center-label"
                  style={{ color: "white" }}
                >
                  Center
                </InputLabel>
                <Select
                  labelId="location-label"
                  label="Location"
                  variant="outlined"
                  value={serviceCenterId}
                  onChange={(event) => setServiceCenterId(event.target.value)}
                  sx={{
                    "& fieldset": {
                      borderColor: "white",
                    },
                    color: "white",
                  }}
                  inputProps={{ style: { color: "white" } }}
                >
                  {serviceCenter.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <button
                type="submit"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </button>
            </center>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
