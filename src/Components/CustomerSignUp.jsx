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
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
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

function CustomerSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newErrors = validateForm({
      name,
      email,
      phone,
      password,
      confirmPassword,
      location,
      gender,
      age,
      image,
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("location", location);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("role", role);
      formData.append("image", image);

      try {
        const response = await axios.post(
          "http://localhost:5921/customer/register",
          formData
        );
        console.log(response.data);
        handleSnackbarOpen("Registered Successfully", "success");
        setLoading(false);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } catch (error) {
        handleSnackbarOpen("Email already exists", "error");
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
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!data.name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    if (!data.email || !emailRegex.test(data.email))
      newErrors.email = "Valid email is required";
    if (!data.phone || !phoneRegex.test(data.phone))
      newErrors.phone = "Valid phone number is required";
    if (!data.password || !passwordRegex.test(data.password))
      newErrors.password =
        "Password must be at least 8 characters, including a special character, a capital letter, and a small letter";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!data.location) newErrors.location = "Location is required";
    if (!data.age || data.age > 100) newErrors.age = "Age is less than 100";

    if (!data.image) {
      newErrors.image = "Image is required";
    } else if (!allowedImageTypes.includes(data.image.type)) {
      newErrors.image = "Only image files (JPEG, PNG, GIF) are allowed";
    }

    return newErrors;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const defaultTheme = createTheme();

  return (
    <div style={{ backgroundColor: "#1b2046", maxHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-4"></div>
        <div
          className="col-md-4"
          style={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5" style={{ color: "white" }}>
                  Register as Customer
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                        id="age"
                        label="Age"
                        name="age"
                        type="number"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                        error={!!errors.age}
                        helperText={errors.age}
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="password"
                        name="password"
                        fullWidth
                        id="password"
                        label="New Password"
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="password"
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
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
                        name="location"
                        label="Location"
                        type="text"
                        id="location"
                        autoComplete="new-password"
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
                      <FormControl>
                        <FormLabel
                          id="demo-row-radio-buttons-group-label"
                          style={{ color: "white" }}
                        >
                          Gender
                        </FormLabel>
                        <RadioGroup
                          style={{ color: "white" }}
                          row
                          required
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(event) => setGender(event.target.value)}
                        >
                          <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <p style={{ color: "white" }}>&darr; Profile Picture &darr;</p>
                      <TextField
                        type="file"
                        onChange={(event) => setImage(event.target.files[0])}
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
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                  >
                    {snackbarMessage}
                  </MuiAlert>
                </Snackbar>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default CustomerSignUp;
