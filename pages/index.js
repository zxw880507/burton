import { useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import LoadingOnDemand from "../components/LoadingOnDemand";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../store/features/productSlice";
import { checkboxState, getCheckbox } from "../store/features/checkboxSlice";
import CheckBoxGroup from "../components/CheckBoxGroup";
import { setFormState, formState } from "../store/features/formSlice";
import { toggleMode, modeState } from "../store/features/modeSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { checkbox, status, error } = useSelector(checkboxState);
  const { form } = useSelector(formState);
  const mode = useSelector(modeState);

  useEffect(() => {
    dispatch(getProductById("W22-228201")).then(() =>
      dispatch(getCheckbox())
        .unwrap()
        .then(() => dispatch(setFormState()))
    );
  }, []);

  if (mode) {
    return <LoadingOnDemand />;
  }
  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {status === "succeeded" && (
        <Grid>
          {Object.keys(checkbox).map((key, index) => (
            <CheckBoxGroup key={index} label={key} values={checkbox[key]} />
          ))}
          <Button variant="contained" onClick={() => dispatch(toggleMode())}>
            submit
          </Button>
        </Grid>
      )}
      {status === "loading" && <Typography variant="h1">LOADING</Typography>}
      {status === "failed" && <Typography variant="h1">{error}</Typography>}
    </Container>
  );
}

export default HomePage;
