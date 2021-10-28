import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { demandState } from "../store/features/demandSlice";

export default function Result() {
  const { demand } = useSelector(demandState);
  return (
    <Container maxWidth="sm">
      {demand.map((product) => (
        <li>
          <span>{product.id}</span>
          <span>{product.color}</span>
          <span>{product.size}</span>
        </li>
      ))}
    </Container>
  );
}
