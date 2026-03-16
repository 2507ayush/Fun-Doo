import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import api from "../../services/Api";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    let newErrors = {};

    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "email must end with @gmail.com*";
    }

    if (formData.password.length < 8) {
      newErrors.password = "password must be at least 8 characters*";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {

      const res = await api.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data) {

        localStorage.setItem("user", JSON.stringify(res.data));

        alert("Login Successful");

        navigate("/");

      } else {

        setErrors({ password: "Invalid email or password*" });

      }

    } catch (err) {

      console.error(err);
      alert("Login failed");

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

      <Card sx={{ width: 420 }}>
        <CardContent sx={{ p: 4 }}>

          <Typography
            variant="h6"
            sx={{ color: "#1a73e8", fontWeight: 600 }}
            textAlign="center"
          >
            Fundoo Notes
          </Typography>

          <Typography variant="h5" sx={{ mt: 1 }} textAlign="center">
            Sign in
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
            textAlign="center"
          >
            to continue to Fundoo
          </Typography>

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />

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


          <Typography
            component={Link}
            to="/forgot-password"
            sx={{
              color: "#1a73e8",
              fontSize: 14,
              mt: 1,
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Forgot password?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >

            <Button
              sx={{
                fontSize: 13,
                color: "#1a73e8",
                fontWeight: 500,
              }}
              component={Link}
              to="/signup"
            >
              Create account
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#1a73e8",
                textTransform: "none",
                px: 4,
              }}
            >
              Sign In
            </Button>

          </Box>

        </CardContent>
      </Card>

    </Box>

  );
}

export default SignIn;