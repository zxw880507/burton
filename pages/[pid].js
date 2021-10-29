import { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, TextField } from "@mui/material";
import LoadingOnDemand from "../components/LoadingOnDemand";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, productState } from "../store/features/productSlice";
import { checkboxState, getCheckbox } from "../store/features/checkboxSlice";
import CheckBoxGroup from "../components/CheckBoxGroup";
import { setFormState } from "../store/features/formSlice";
import { toggleMode, modeState } from "../store/features/modeSlice";
import { getPhoneNumber } from "../store/features/phoneSlice";
import { useRouter } from "next/router";

export default function itemPage() {
  const router = useRouter();
  const [interval, setInterval] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { pid } = router.query;
  const dispatch = useDispatch();
  const { checkbox, status, error } = useSelector(checkboxState);
  const { product } = useSelector(productState);
  const mode = useSelector(modeState);

  useEffect(() => {
    if (pid) {
      dispatch(getProductById(pid)).then(() =>
        dispatch(getCheckbox())
          .unwrap()
          .then(() => dispatch(setFormState()))
      );
    }
  }, [pid]);

  if (mode) {
    return <LoadingOnDemand pid={pid} interval={interval} />;
  }
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2em",
      }}
    >
      {status === "succeeded" && (
        <Grid>
          <Typography
            variant="h6"
            sx={{ marginBottom: "1.5rem", color: "tomato", fontWeight: "600" }}
          >
            {product[0] ? product[0].name : ""}
          </Typography>
          {Object.keys(checkbox).map((key, index) => (
            <CheckBoxGroup key={index} label={key} values={checkbox[key]} />
          ))}
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            <TextField
              id="fetch-interval"
              label="Fetch interval (秒)"
              type="number"
              variant="standard"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
            />
            <TextField
              id="phone-number"
              label="Phone number (optional)"
              type="tel"
              variant="standard"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <Grid container sx={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "2rem" }}
              onClick={() => {
                dispatch(toggleMode());
                dispatch(getPhoneNumber(phoneNumber));
              }}
            >
              submit
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                router.push("/").then(() => dispatch({ type: "RESET" }));
              }}
            >
              back
            </Button>
          </Grid>
        </Grid>
      )}
      {status === "loading" && <Typography variant="h1">LOADING</Typography>}
      {status === "failed" && <Typography variant="h1">{error}</Typography>}
    </Container>
  );
}
