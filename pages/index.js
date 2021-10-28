import { useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../store/features/productSlice";
import { checkboxState, getCheckbox } from "../store/features/checkboxSlice";
import CheckBoxGroup from "../components/checkBoxGroup";
import { setFormState, formState } from "../store/features/formSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { checkbox, status, error } = useSelector(checkboxState);
  const { form } = useSelector(formState);

  useEffect(() => {
    dispatch(getProductById("W22-219571")).then(() =>
      dispatch(getCheckbox())
        .unwrap()
        .then(() => dispatch(setFormState()))
    );
  }, []);

  return (
    <Container maxWidth="sm">
      {status === "succeeded" && (
        <Grid>
          {Object.keys(checkbox).map((key, index) => (
            <CheckBoxGroup key={index} label={key} values={checkbox[key]} />
          ))}
          <Button
            variant="contained"
            onClick={() => console.log("this is form:", form)}
          >
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
