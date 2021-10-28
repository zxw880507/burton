import { useEffect } from "react";
import { Container, CircularProgress, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnDemand, demandState } from "../store/features/demandSlice";
import { toggleMode } from "../store/features/modeSlice";
import { useRouter } from "next/router";

export default function LoadingOnDemand() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSelector(demandState);

  useEffect(() => {
    const interval = setInterval(
      () => dispatch(fetchOnDemand("W22-228201")),
      5000
    );
    if (status === "succeeded") {
      clearInterval(interval);
      router.push("/result");
    }
    return () => clearInterval(interval);
  }, [status]);
  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <CircularProgress size={"20em"} />
      <Button variant="contained" onClick={() => dispatch(toggleMode())}>
        back
      </Button>
    </Container>
  );
}
