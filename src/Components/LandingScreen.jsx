import { AccountCircleRounded, AppRegistration, Construction, DescriptionSharp, Garage, Login } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import React from "react";
import { Dropdown } from "react-bootstrap";

const LandingScreen = () => {


     const scrollToAboutUs = (event) => {
          event.preventDefault();
          const aboutUsElement = document.getElementById("aboutUs");
          aboutUsElement.scrollIntoView({ behavior: "smooth" });
        };
        

  return (
     <>
    <div className="container-fluid"
        style={{
          display: "flex",
          height: "100vh",
          flexDirection:"column",
          backgroundImage:
            "url('https://th.bing.com/th/id/R.14d7e605e3d2a3570c85337b1fd84ec1?rik=tM7%2bjwVcXxO1wg&riu=http%3a%2f%2fleadright.ae%2fwp-content%2fuploads%2f2017%2f12%2fcar.gif&ehk=T8syoMHrKvF4kWVqHXgS8%2baQjT2XPl0TQ56vrRZ0J94%3d&risl=&pid=ImgRaw&r=0')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="row">
          <div className="col"
            style={{
              display: "flex",
              marginLeft: "10px",
              marginTop: "10px",
              textAlign: "start",
              color: "white",
              fontFamily: "serif",
              fontSize: "40px",
            }}
          >
            <div style={{ marginRight: "10px" }}><Construction style={{ fontSize: "40px" }} /></div>
            Auto Care
          </div>
          <div className="col-md-6" style={{ color: "white",
            marginTop: "10px",
            fontFamily: "serif",
            fontSize: "30px",
      }}>
            <div className="row" style={{ color: "white" }}>
              <div className="col-md-4"><a
                href="#aboutUs"
                onClick={scrollToAboutUs}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <DescriptionSharp /> About Us
              </a></div>
              <div
                className="col-md-4"
                style={{ color: "white", height: "8vh" }}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "24px",
                    }}
                  >
                    <AppRegistration style={{ fontSize: "24px" }} /> Register
                  </Dropdown.Toggle >
                  <Dropdown.Menu style={{ backgroundColor: "transparent", border: "none", }}>
                    <Dropdown.Item href="/serviceCenterSignUp" style={{ color: "white", backgroundColor: "transparent", fontSize: "24px" }}>
                      <Garage style={{ fontSize: "24px" }} /> ServiceCenter
                    </Dropdown.Item>
                    <Dropdown.Item href="/customerSignUp" style={{ color: "white", backgroundColor: "transparent", fontSize: "24px" }}> <AccountCircleRounded style={{ fontSize: "24px" }} /> Customer</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="col-md-4"><a
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <Login style={{ fontSize: "24px" }} /> Login
              </a></div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop:"10%"}}>
          <div className="col-md-6">
            <div className="col-md-12">
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
                      fontSize: "40px",
                      fontWeight: "bolder",
                      color: "white",
                      fontFamily:"serif"
                    }}
                  >
                    MISSION
                  </span>
                </div>
                <br></br>
                <div
                  style={{ fontSize: "20px", fontWeight: "", color: "white", fontFamily:"serif" }}
                >
                  Our mission is simply to be the best in every area of our business. 
                  We lead by providing the most exceptional customer experience, 
                  offering convenience without compromising on quality, 
                  while actively supporting our community of auto-enthusiasts. 
                  We want every customer of ours to be a customer for life.
                </div>
                <br></br>
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
          </div>
        </div>
      
    </div>
    <div className="container-fluid" id="aboutUs">
        <div className="row" style={{backgroundColor:"#1b2046", height:"100vh"}}>
          <div className="col-md-6">
          <div
                  style={{
                    marginTop:"25%",
                    marginLeft:"5%",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <br />
                  <div>
                    <span
                      style={{
                        fontSize: "40px",
                        fontWeight: "bolder",
                        color: "white",
                        fontFamily:"serif"
                      }}
                    >
                      With Over 25 Year of Experience in Auto Service Work
                    </span>
                  </div>
                  <br></br>
                  <div
                    style={{ fontSize: "20px", fontWeight: "", color: "white" , fontFamily:"serif"}}
                  >
                    Value is a Service of trust. The trust customers have in
                    you. The trust have in your people, strategies and systems.
                    And Always delivering on expectation.
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
          <div className="col-md-6"> 
          <div
            className="container-fluid"
            style={{
              height: "100vh",
              backgroundColor: "black",
              backgroundImage:
                "url('https://i1.wp.com/leadright.ae/wp-content/uploads/2017/12/who-we-are.jpg?w=960&ssl=1')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
              backgroundSize: "cover",
              width:"100%"
            }}
          ></div>
     </div>
     </div>
     
      </div>
    </>
  );
};

export default LandingScreen;
