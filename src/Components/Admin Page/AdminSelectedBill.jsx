import React from "react";
import { Divider } from "@mui/material";
import html2canvas from 'html2canvas';

const AdminSelectedBill = ({ selectedBill }) => {
  const handleDownloadAsImage = (bill) => {
    const container = document.getElementById('selected-bill-container');
    html2canvas(container, {
      onclone: (clonedDoc) => {
        clonedDoc.getElementById('button-container').style.display = 'none';
      }
    }).then((canvas) => {
      const imageURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = `bill-${bill.id}.png`;
      link.click();
    });
  };

  return (
    <div id="selected-bill-container" className="container" style={{ maxWidth: "40%", border: "1px solid black", padding: "10px 0px" }}>
      {selectedBill!= null && (
        <>
          <div style={{color:'blue'}}>
            Invoice Number : <span>{selectedBill.id}</span>
          </div>
          <Divider />
          <br></br>
          <div style={{ fontFamily: "serif", fontWeight: "bolder",color:'blue'}}>
            Address
          </div>
          <div style={{color:'blue'}}>{selectedBill.serviceCenter.name}</div>
          <div style={{color:'blue'}}>{selectedBill.serviceCenter.location}</div>
          <Divider />
          <br />
          {selectedBill.customer!= null && (
            <>
              <b style={{color:'blue'}}>User Information</b>
              <div style={{color:'blue'}}>{selectedBill.customer.name}</div>
              <div style={{color:'blue'}}>{selectedBill.customer.email}</div>
              <div style={{color:'blue'}}>{selectedBill.customer.phone}</div>
              <div style={{color:'blue'}}>{selectedBill.customer.location}</div>
            </>
          )}
          <Divider />
          <br />
          <b style={{color:'blue'}}>Faults Handled</b>
          <div style={{color:'blue'}}>{selectedBill.description}</div>
          <Divider />
          <br />
          <div>
            <b style={{color:'blue'}}>Price:</b> <div style={{color:'blue'}}>{selectedBill.billEstimation}</div>
          </div>
          <br />
          <div id="button-container">
            <button className="btn btn-primary" onClick={() => handleDownloadAsImage(selectedBill)}>
              Download as Image
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSelectedBill;