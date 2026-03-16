import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Api from "../services/Api";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert
} from "@mui/material";

export default function VerifyOTP() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const otpRef = useRef(null);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleVerify = async () => {

    const otp = otpRef.current.value.trim();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    try {

      const res = await Api.post("/user/verify-otp", {
        email: email,
        otp: otp
      });

      if (res.status === 200) {

        setSuccessMsg("OTP verified successfully");

        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1500);

      }

    } catch (err) {

      console.error(err);

      setError("Invalid OTP");

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa"
      }}
    >

      <Card sx={{ width: 420, p: 2 }}>

        <CardContent>

          <Typography
            variant="h5"
            fontWeight={600}
            color="#1a73e8"
            align="center"
            mb={2}
          >
            Fundoo Notes
          </Typography>

          <Typography
            variant="h6"
            align="center"
            mb={1}
          >
            Verify OTP
          </Typography>

          <Typography
            variant="body2"
            align="center"
            mb={3}
            color="text.secondary"
          >
            Enter the OTP sent to your email
          </Typography>

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Enter OTP"
            fullWidth
            inputRef={otpRef}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#1a73e8",
              textTransform: "none"
            }}
            onClick={handleVerify}
          >
            Verify OTP
          </Button>

        </CardContent>

      </Card>

    </Box>
  );
}