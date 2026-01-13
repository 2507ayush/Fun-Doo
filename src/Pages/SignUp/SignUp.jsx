import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate,Link } from "react-router-dom";
import shield from "../../assets/signup.jpeg";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.firstName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.firstName = "Enter a valid first name";
    }

    if (!formData.lastName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.lastName = "Enter a valid last name";
    }

    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 900 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex" }}>
            
            {/* LEFT SECTION */}
            <Box sx={{ flex: 1, pr: 4 }}>
              <Typography variant="h6" sx={{ color: "#1a73e8", fontWeight: 600 }}>
                Fundoo
              </Typography>

              <Typography variant="h5" sx={{ mt: 1, mb: 3 }}>
                Create your Fundoo account
              </Typography>

              {/* First & Last Name */}
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Box>

              {/* Email */}
              <TextField
                fullWidth
                label="Your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 0.5 }}
              />

              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
                use only letters,numbers & periods
              </Typography>

              {/* Password */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  fullWidth
                  label="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                use 8 or more characters with a mix of letters, numbers & symbols
              </Typography>

              {/* Actions */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Button
                  underline="none"
                  sx={{
                    fontSize: 13,
                    color: "#1a73e8",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                  component={Link} to="/signin"
                >
                  SIGN IN INSTEAD
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: "#1a73e8",
                    textTransform: "none",
                    px: 4,
                    "&:hover": {
                      bgcolor: "#1558b0",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>

            {/* RIGHT SECTION */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={shield}
                alt="Fundoo"
                style={{ width: "280px", marginBottom: "16px" }}
              />

              <Typography variant="body2" color="text.secondary" align="center">
                One account. All of Fundoo working for you
              </Typography>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignUp;
