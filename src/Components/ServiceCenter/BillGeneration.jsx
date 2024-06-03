import React, { useState, useEffect } from "react";
import NavbarServiceCenter from "./NavbarServiceCenter";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  CircularProgress,
  Table,
  TableBody,
  td,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Close, Done } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const faultCategories = {
  "Diagnistic Assessment": 600,
  "Fluid Check and Replacement": 1500,
  "Transmission Components": 960,
  "Electronic control system check": 998,
  "Seals and Gaskets": 980,
  "Transmission rebuild": 956,
  Springs: 6200,
  "Shock absorbers": 5200,
  "Ball joints": 3000,
  Struts: 3500,
  "Control arms": 3200,
  "Sway bar": 2600,
  "Sway bar links": 2600,
  "Fuel filter": 1000,
  "Fuel pump": 6200,
  "Fuel injectors": 1200,
  "Fuel pressure": 1600,
  "Fuel pressure regulator": 2600,
  "Fuel tank": 2600,
  "Fuel tank cap": 550,
  Painting: 16000,
  Tinkering: 8956,
  Battery: 9600,
  Alternator: 3200,
  Starter: 6300,
  "Ignition coil": 700,
  "Spark plugs": 300,
  "Spark plug wires": 300,
  "Brake Pads": 1500,
  "Brake fluid leaks": 655,
  "Brake overheating": 12000,
  "Brake pedals": 600,
  "Brake warning lights": 900,
  "Steering wheel alignment": 1700,
  "Brake fade": 960,
  "Thermostat Correction": 3200,
  "Water pump failure": 2360,
  "Defective fan": 3200,
  "Radiator problems": 1800,
  "Low coolant": 1200,
  "Cooling system": 5600,
  Pistons: 10000,
};

const BillGeneration = () => {
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const { faultInfo, serviceId, customerId } = useParams();
  const [selectedItems, setSelectedItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    billEstimation: 0,
    date: "",
    description: "",
    status: "PAID",
  });

  useEffect(() => {
    const getCustomerId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5921/serviceRequest/getRequestbyId/${serviceId}`
        );
        setCustomer(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setLoading(false);
      }
    };
    getCustomerId();
  }, [serviceId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0 || loading) {
      alert("Please select services before generating the bill.");
      return;
    }
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: formattedDate,
    }));
    try {
      customer.status = "RESOLVED";
      customer.progress="DELIVERED"
      await axios.put(
        `http://localhost:5921/serviceRequest/update/${serviceId}?scId=${sessionId}`,
        customer
      );
      await axios.post(
        `http://localhost:5921/bill/create?cId=${customerId}&scId=${sessionId}&srId=${serviceId}`,
        { ...formData, date: formattedDate }
      );

      alert("Bill Generated");
        navigate(-1);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedItems(value);
    const selectedPrices = value.map((item) => faultCategories[item]);
    const totalPrice = selectedPrices.reduce((acc, price) => acc + price, 0);
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value.join(", "),
      billEstimation: totalPrice,
    }));
  };

  const removeFromSelected = (item) => {
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(updatedSelectedItems);
    const selectedPrices = updatedSelectedItems.map(
      (item) => faultCategories[item]
    );
    const totalPrice = selectedPrices.reduce((acc, price) => acc + price, 0);
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: updatedSelectedItems.join(", "),
      billEstimation: totalPrice,
    }));
  };

  return (
    <div  className="conatiner-fluid" style={{backgroundColor:"#1b2046", color:"white", minHeight:"100vh"}}>
      <NavbarServiceCenter />
      <br />
      <div className="bill-generation-container" >
        <h1>Generate Bill</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="form-container selected-items-table" style={{backgroundColor:"#1b2046"}}>
            <form onSubmit={handleUpdate} className="bill-form">
              
              <FormControl
                sx={{ m: 1, width: "40%" }}
                className="form-control"
                style={{backgroundColor:"#1b2046"}}
              >
                
                <InputLabel id="demo-multiple-checkbox"  style={{backgroundColor:"#1b2046", fontSize:"16px"}}>
                  Select Services
                </InputLabel>
                <Select
                style={{backgroundColor:"#1b2046"}}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedItems}
                  onChange={handleChange}
                  input={<OutlinedInput label="Select Service" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  sx={{
                    "& fieldset": {
                      borderColor: "white",
                    },
                    color:"white"
                  }}
                  inputProps={{ style: { color: "white" } }}
        InputLabelProps={{ style: { color: "white" } }}
                >
                  {Object.keys(faultCategories).map((fault) => (
                    <MenuItem key={fault} value={fault}>
                      <Checkbox checked={selectedItems.indexOf(fault) > -1} />
                      <ListItemText primary={fault} secondary={`$${faultCategories[fault]}`} />
                    </MenuItem>
                  ))}
                </Select>
             
              </FormControl>
             <br></br>
              <button type="submit" className="generate-bill-button" style={{backgroundColor:"#1b2046", color:"white", padding:"5px 20px", border:"1px solid white", borderRadius:"5px"}}>
                Generate Bill <Done/>
              </button>
            </form>
            <br/>
            {selectedItems.length > 0 && (
              <div className="container" style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div className="selected-items-table d-flex flex-column justify-center" style={{width:"50%"}}>
                <h2>Services Billed</h2>
                <br></br>
              
                  <table className="table table-bordered" style={{color:"blue"}} inputProps={{ style: { color: "white" } }}>
                    <thead>
                      <tr>
                        <td>Service</td>
                        <td>Price</td>
                        <td>Action</td>
                     </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item}</td>
                          <td>${faultCategories[item]}</td>
                          <td>
                            <button onClick={() => removeFromSelected(item)} style={{backgroundColor:"transparent",border:"none"}}>
                              <Close style={{color:"red", backgroundColor:"transparent",}}/>
                            </button>
                          </td>
                        </tr>
                      ))}
                      <TableRow>
                        <td >
                          Total:
                        </td>
                        <td colSpan={2} align="left">${formData.billEstimation}</td>
                      </TableRow>
                    </tbody>
                  </table>
              
              </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BillGeneration;
