import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import React,{useState} from "react";

import { useNavigate,Link } from "react-router-dom";
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
  
    
    const handleSubmit = () => {
  let newErrors = {};
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    setErrors({ general: "User not found, Please Sign up" });
    return;
  }

  if (!formData.email.endsWith("@gmail.com")) {
    newErrors.email = "Email must end with @gmail.com";
  } else if (formData.email !== userData.email) {
    newErrors.email = "Email does not match";
  }

  if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (formData.password !== userData.password) {
    newErrors.password = "Password is incorrect";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
  } else {
    setErrors({});
    navigate("/");
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
          
          {/* Header */}
          <Typography
            variant="h6"
            sx={{ color: "#1a73e8", fontWeight: 600 }}
          >
            Fundoo
          </Typography>

          <Typography variant="h5" sx={{ mt: 1 }}>
            Sign in
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            to continue to Fundoo
          </Typography>

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

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block" }}
          >
            use only letters, numbers & periods
          </Typography>

          {/* Password */}
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
            variant="caption"
            color="text.secondary"
            sx={{ mb: 3, display: "block" }}
          >
            use only letters, numbers & periods
          </Typography>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
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
              component={Link} to="/signup"
            >
              BACK TO SIGN UP?
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

        </CardContent>
      </Card>
    </Box>
  );
}

export default SignIn;
