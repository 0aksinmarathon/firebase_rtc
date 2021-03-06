import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        target="_blank"
        rel="noopener"
        color="inherit"
        href="https://material-ui.com/"
      >
        Your Website
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ rtcClient }) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [isComposed, setIsComposed] = useState(false);
  useEffect(() => {
    const disabled = name === "";
    setDisabled(disabled);
  }, [name]);

  const initializeLocalPeer = useCallback(
    async (e) => {
      await rtcClient.startListening(name);
      e.preventDefault();
    },
    [name, rtcClient]
  );

  if (rtcClient.localPeerName !== "") return <></>;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="あなたの名前"
            name="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={async (e) => {
              if (isComposed) return;
              if (e.target.value === "") return;
              if (e.key === "Enter") await initializeLocalPeer(e);
            }}
            onCompositionStart={() => {
              setIsComposed(true);
            }}
            onCompositionEnd={() => {
              setIsComposed(false);
            }}
            value={name}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
            onClick={async (e) => await initializeLocalPeer(e)}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
