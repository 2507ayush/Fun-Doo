import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Api from "../services/Api";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from "@mui/material";

export default function ForgotPassword() {

  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async () => {

    const email = emailRef.current.value.trim();
    let newErrors = {};

    // email validation
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {

      const res = await Api.post("/user/send-otp", {
        email: email
      });

      if (res.status === 200) {

        setSuccessMsg("OTP sent to your email");

        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 1500);

      }

    } catch (err) {

      console.error(err);

      if (err.response && err.response.status === 400) {
        setErrors({ email: err.response.data });
      } else {
        setErrors({ general: "Server error. Please try again." });
      }

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa",
      }}
    >

      <Card sx={{ width: 420, p: 2 }}>
        <CardContent>

          <Typography
            variant="h5"
            fontWeight={600}
            color="#1a73e8"
            mb={1}
            align="center"
          >
            Fundoo Notes
          </Typography>

          <Typography variant="h5" fontWeight={400} mb={1} align="center">
            Forgot Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={3}
            align="center"
          >
            Enter your email to receive OTP
          </Typography>

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          {/* EMAIL */}

          <TextField
            label="Email"
            fullWidth
            autoComplete="off"
            sx={{ mb: 3 }}
            inputRef={emailRef}
            error={!!errors.email}
            helperText={errors.email}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >

            <Link
              component={RouterLink}
              to="/signin"
              underline="none"
              fontWeight={500}
            >
              Back to Sign in
            </Link>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#1a73e8",
                textTransform: "none",
                px: 4,
              }}
              onClick={handleSubmit}
            >
              Send OTP
            </Button>

          </Box>

        </CardContent>
      </Card>

    </Box>

  );
}