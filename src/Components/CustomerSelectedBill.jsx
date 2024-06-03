import React from "react";
import { Divider } from "@mui/material";
import html2canvas from 'html2canvas';

const CustomerSelectedBill = ({ selectedBill }) => {
  const handleDownloadAsImage = (bill) => {
    const container = document.getElementById('selected-bill-content');
    html2canvas(container).then((canvas) => {
      const imageURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = `bill-${bill.id}.png`;
      link.click();
    });
  };

  return (
    <div id="selected-bill-container" className="container" style={{ maxWidth: "40%", border: "1px solid black", padding: "10px 0px", backgroundColor:"#1b2046" }}>
      {selectedBill!= null && (
        <div id="selected-bill-content">
          <>
            <div style={{color:"lightblue"}}>
              Invoice Number : <span>{selectedBill.id}</span>
            </div>
            <Divider />
            <br></br>
            <div style={{ fontFamily: "serif", fontWeight: "bolder",color:"lightblue"}}>
              Address
            </div>
            <div style={{color:"lightblue"}}>{selectedBill.serviceCenter.name}</div>
            <div>{selectedBill.serviceCenter.location}</div>
            <Divider />
            <br />
            {selectedBill.customer!= null && (
              <div style={{color:"lightblue"}}>
                <b>User Information</b>
                <div>{selectedBill.customer.name}</div>
                <div>{selectedBill.customer.email}</div>
                <div>{selectedBill.customer.phone}</div>
                <div>{selectedBill.customer.location}</div>
              </div>
            )}
            <Divider />
            <br />
            <b>Faults Handled</b>
            <div style={{color:"lightblue"}}>{selectedBill.description}</div>
            <Divider />
            <br />
            <div style={{color:"lightblue"}}>
              <b>Price:</b> <>{selectedBill.billEstimation}</>
            </div>
            <br />
          </>
        </div>
      )}
      <button className="btn btn-primary" onClick={() => handleDownloadAsImage(selectedBill)}>
        Download as Image
      </button>
    </div>
  );
};

export default CustomerSelectedBill;