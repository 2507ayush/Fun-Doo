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

export default function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleReset = async () => {

    const newPassword = newPasswordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    let newErrors = {};

    if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {

      const res = await Api.post("/user/reset-password", {
        email: email,
        password: newPassword
      });

      if (res.status === 200) {

        setSuccessMsg("Password reset successful! Redirecting to login...");

        setTimeout(() => {
          navigate("/signin");
        }, 2000);

      }

    } catch (err) {

      console.error(err);
      setErrors({ general: "Server error. Please try again." });

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
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            align="center"
            mb={3}
            color="text.secondary"
          >
            Enter your new password
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

          {/* NEW PASSWORD */}

          <TextField
            label="New Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            inputRef={newPasswordRef}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />

          {/* CONFIRM PASSWORD */}

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            sx={{ mb: 3 }}
            inputRef={confirmPasswordRef}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#1a73e8",
              textTransform: "none"
            }}
            onClick={handleReset}
          >
            Reset Password
          </Button>

        </CardContent>
      </Card>

    </Box>
  );
}