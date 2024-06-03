import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { CircularProgress, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "lightblue",
        },
      },
    },
  },
});

function ServiceCenterSignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("SERVICE");
  const [status, setStatus] = useState("PENDING");
  const [gstNumber, setGstNumber] = useState("");
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newErrors = validateForm({
      name,
      email,
      phone,
      password,
      status,
      confirmPassword,
      location,
      gstNumber,
      image,
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("gstNumber", gstNumber);
      formData.append("role", role);
      formData.append("status", status);
      formData.append("location", location);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await axios.post(
          "http://localhost:5921/serviceCenter/register",
          formData
        );
        console.log(response.data);
        setSnackbarMessage("Registered Successfully");
        setSnackbarOpen(true);
        // Simulate a delay for demonstration
        setTimeout(() => {
          setLoading(false);
          navigate(-1);
        }, 2000);
      } catch (error) {
        setSnackbarMessage("Email already exists");
        setSnackbarOpen(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const gstNumberRegex = /^[A-Za-z0-9]{15}$/;
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/avif", "image/heic"];

    if (!data.name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    if (!data.email || !emailRegex.test(data.email))
      newErrors.email = "Valid email is required";
    if (!data.phone || !phoneRegex.test(data.phone))
      newErrors.phone = "Valid phone number is required";
    if (!data.password || data.password.length < 8)
      newErrors.password =
        "Password must be at least 8 characters long";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!data.gstNumber || !gstNumberRegex.test(data.gstNumber))
      newErrors.gstNumber = "GST number is required and must be 15 characters long.";
      
    if (!data.image) {
      newErrors.image = "Image is required";
    } else if (!allowedImageTypes.includes(data.image.type)) {
      newErrors.image = "Only image files (JPEG, PNG, GIF, AVIF, HEIC) are allowed";
    }

    if (!data.location) newErrors.location = "Location is required";

    return newErrors;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ backgroundColor: "#1b2046", minHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-4" style={{ height: "100vh" }}></div>
        <div
          className="col-md-4"
          style={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <ThemeProvider theme={theme}>
            <Container
              component="main"
              maxWidth="xs"
              style={{ maxHeight: "100vh", color: "white" }}
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ marginBottom: "10px" }}
                >
                  Register for Service Center
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        error={!!errors.location}
                        helperText={errors.location}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="gstNumber"
                        label="GST Number"
                        name="gstNumber"
                        value={gstNumber}
                        onChange={(event) => setGstNumber(event.target.value)}
                        error={!!errors.gstNumber}
                        helperText={errors.gstNumber}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="image"
                        label="Profile"
                        name="image"
                        type="file"
                        onChange={handleChange}
                        error={!!errors.image}
                        helperText={errors.image}
                        sx={{
                          "& fieldset": {
                            borderColor: "white",
                          },
                          '& input[type="file"]': {
                            width: "100%",
                            padding: "10px",
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: "transparent",
                            color: "white",
                            "&::-webkit-file-upload-button": {
                              visibility: "hidden",
                            },
                          },
                        }}
                        inputProps={{ style: { color: "white" } }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
        <div className="col-md-4" style={{ height: "100vh" }}></div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

export default ServiceCenterSignUp;
