import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

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

function Login() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when login request starts
    const formData = new FormData(event.currentTarget);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    let emailValid = true;
    let passwordValid = true;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Invalid email format");
      emailValid = false;
    } else {
      setEmailError("");
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must contain at least one special character, one capital letter, and a minimum length of 8 characters"
      );
      passwordValid = false;
    } else {
      setPasswordError("");
    }

    if (emailValid && passwordValid) {
      axios
        .post("http://localhost:5921/login", userData)
        .then((response) => {
          console.log("Login successful:", response.data);
          const { sessionId, role } = response.data;
          setUserId(sessionId);
          localStorage.setItem("sessionId", sessionId);

          if (role === "CUSTOMER") {
            navigate(`/customer/${sessionId}`);
          } else if (role === "ADMIN") {
            navigate(`/admin/${sessionId}`);
          } else if (role === "SERVICE") {
            navigate(`/serviceCenter/${sessionId}`);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setOpenSnackBar(true);
          } else {
            setOpenSnackBar(true);
          }
        })
        .finally(() => {
          setLoading(false); // Reset loading state when request is completed
        });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1b2046",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        className="container d-flex align-center justify-center"
        style={{ width: "60%" }}
      >
        <ThemeProvider theme={theme}>
          <Snackbar
            open={openSnackBar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={6000}
            onClose={() => setOpenSnackBar(false)}
          >
            <Alert severity="error" onClose={() => setOpenSnackBar(false)}>
              Invalid Email or password
            </Alert>
          </Snackbar>
          <Grid container component="main" sx={{ height: "80vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://images.hdqwalls.com/wallpapers/blue-bmw-4k-2019-v6.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
              sx={{ backgroundColor: "#1b2046" }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: "white" }}
                >
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value) + "@gmail.com"}
                    error={emailError !== ""}
                    helperText={emailError}
                    sx={{
                      "& fieldset": {
                        borderColor: "white",
                      },
                    }}
                    inputProps={{ style: { color: "white" } }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError !== ""}
                    helperText={passwordError}
                    sx={{
                      "& fieldset": {
                        borderColor: "white",
                      },
                    }}
                    inputProps={{ style: { color: "white" } }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, color: loading ? "white" : "white" }} // Add color style for loading
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Sign In"}
                  </Button>
                  <br />
                  <center>
                    <Grid container>
                      <Grid item>
                        <Link href="/customerSignUp" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </center>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Login;
