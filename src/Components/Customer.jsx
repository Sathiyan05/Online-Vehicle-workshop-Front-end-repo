import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import axios from "axios";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Divider, Button, Modal, Box, TextField } from "@mui/material";
import { LocalPhone, LocationOnSharp, Numbers, PinDrop, Wc, WcOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomerPage = () => {
  const sessionId = localStorage.getItem("sessionId");

  const [customer, SetCustomer] = useState([]);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/customer/getCustomer/${sessionId}`
        );
        SetCustomer(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    getCustomer();
  }, []);

  const handleOpen = () => {
    setFormValues({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      location: customer.location || "",
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5921/customer/update/${sessionId}`,
        formValues
      );
      window.location.reload();
      SetCustomer(response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="conatiner-fluid" style={{backgroundColor:"#1b2046", color:"white", height:"100vh"}}>
      <div style={{ width: "100%" }}>
        {" "}
        <NavBar />
      </div>
      <div className="container">
      <div className="row" style={{ height: "80vh" }}>
        <div
          className="col-md-6 d-flex"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <img
            src={`data:image/jpeg;base64,${customer.image}`}
            style={{ height: "60%", width: "60%", borderRadius: "400px" }}
          />
        </div>
        <div
          className="col-md-6 d-flex flex-column"
          style={{ textAlign: "initial" }}
        >
          <br />
          <div>
          <h1 style={{ fontFamily: "serif", fontSize: "56px" }}>
            {customer.name}
          </h1>
          </div>
          
          <Divider style={{ border: "1px solid black" }} />
          
          <br />
          <br />
          <div className="d-flex">
          <MarkEmailReadIcon style={{fontSize:"44px"}}/>&nbsp;&nbsp;
          <h5 style={{ fontFamily: "serif", fontSize: "40px" }}>{customer.email}</h5>
          </div>
          <div className="d-flex">
          <LocalPhone style={{fontSize:"44px"}}/>&nbsp;&nbsp;
          <h5 style={{ fontFamily: "serif", fontSize: "36px" }}>{customer.phone}</h5>
          </div>
          <div className="d-flex">
          <PinDrop style={{fontSize:"44px"}}/>&nbsp;&nbsp;
          <h5 style={{ fontFamily: "serif", fontSize: "36px" }}>{customer.location}</h5 >
          </div>
          <div className="d-flex">
          <Numbers style={{fontSize:"44px"}}/>&nbsp;&nbsp;
          <h5 style={{ fontFamily: "serif", fontSize: "36px" }}>Age : {customer.age}</h5 >
          </div>
          <div className="d-flex">
          <WcOutlined style={{fontSize:"44px"}}/>&nbsp;&nbsp;
          <h5 style={{ fontFamily: "serif", fontSize: "36px" }}>{customer.gender}</h5 >
          </div>
          <br />
          <br />
          <br />
          <br />
          <Button variant="outlined" onClick={handleOpen}>
            Edit
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2>Edit Profile</h2>
              <TextField
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
              disabled
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CustomerPage;
