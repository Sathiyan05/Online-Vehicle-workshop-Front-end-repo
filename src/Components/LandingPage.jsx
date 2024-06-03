import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const LandingPage = () => {
  const scrollToAboutUs = (event) => {
    event.preventDefault();
    const aboutUsElement = document.getElementById("aboutUs");
    aboutUsElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div
            className="col-md-12 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#1a243a",
              height: "10vh",
              fontSize: "40px",
              color: "white",
              fontFamily:"serif"
            }}
          >
            Auto Care  
            
          </div> 
        </div>
        <div className="row">
          <div
            className="col-md-4 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#2b3858", color: "white", height: "8vh" }}
          >
            <a
              href="#aboutUs"
              onClick={scrollToAboutUs}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
              About Us
            </a>
          </div>
          {/* <div
            className="col-md-3 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "black", color: "white", height: "8vh" }}
          >
            <a
              href=""
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
              Services
            </a>
          </div> */}
          <div
            className="col-md-4 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#2b3858", color: "white", height: "8vh" }}
          >
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Register
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/serviceCenterSignUp">
                  ServiceCenter
                </Dropdown.Item>
                <Dropdown.Item href="/customerSignUp">Customer</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
            className="col-md-4 justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "#2b3858", color: "white", height: "8vh" }}
          >
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
              Login
            </a>
          </div>
        </div>

        <div className="row">
          <div
            className="container-fluid"
            style={{
              height: "85vh",
              backgroundImage:
                "url('https://th.bing.com/th/id/R.14d7e605e3d2a3570c85337b1fd84ec1?rik=tM7%2bjwVcXxO1wg&riu=http%3a%2f%2fleadright.ae%2fwp-content%2fuploads%2f2017%2f12%2fcar.gif&ehk=T8syoMHrKvF4kWVqHXgS8%2baQjT2XPl0TQ56vrRZ0J94%3d&risl=&pid=ImgRaw&r=0')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="row">
              <div
                className="col-md-6 justify-content-center align-items-center d-flex flex-column"
                style={{ height: "80vh" }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    margin: "20px 15px",
                    borderRadius: "5px",
                  }}
                >
                  <br />
                  <div>
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: "bolder",
                        color: "white",
                      }}
                    >
                      Vehicle System Services
                    </span>
                  </div>
                  <br></br>
                  <div
                    style={{ fontSize: "20px", fontWeight: "", color: "white" }}
                  >
                    We provide a High Quality Vehicle service and maitainace for
                    all type of vehicle....
                  </div>
                  <br></br>
                  <a href="/login">
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid white",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      Raise Service Request
                    </button>
                  </a>

                  <br />
                  <br />
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default LandingPage;
