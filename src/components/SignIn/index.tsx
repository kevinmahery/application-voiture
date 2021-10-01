import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const CustomContainer = styled(Container)(() => ({
  height: "90vh",
  display: "flex",
  alignItems: "center",
}));

export default function SignIn() {
  const history = useHistory();
  const { changeAuthentication } = useAuth();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [showError, setShowError] = React.useState(false);

  const handleChangeValue = (event: any, type: string) => {
    setUser({
      ...user,
      [type]: event.target.value,
    });
  };

  const handleSubmit = () => {
    setShowError(false);
    if (user.email === "test@test.com" && user.password === "test") {
      localStorage.setItem("access_token", "access_token");
      changeAuthentication(true);
      history.push("/");
    } else {
      setShowError(true);
    }
  };

  return (
    <CustomContainer maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={(event) => handleChangeValue(event, "email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={(event) => handleChangeValue(event, "password")}
          />
          {showError && (
            <Typography variant="body1" color="red">
              L'adresse e-mail ou le mot de passe est incorrect
            </Typography>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={user.email.length === 0 || user.password.length === 0}
            onClick={handleSubmit}
          >
            Se connecter
          </Button>
        </Box>
      </Box>
    </CustomContainer>
  );
}
