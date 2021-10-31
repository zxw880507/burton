import nc from "next-connect";
import cors from "cors";
import axios from "axios";
import { restockQueryString } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const { pid, item } = req.query;
    try {
      const response = await axios.get(restockQueryString(item, pid));
      if (Object.keys(response.data.product).length) {
        const { availability } = response.data.product;
        const { inStockDate, available, availabilityStatus, buttonCopy } =
          availability;

        const { id, name, color, size } = JSON.parse(item);
        const data = {
          id,
          name,
          color,
          size,
          status: available ? availabilityStatus : buttonCopy,
          inStockDate,
        };
        res.status(200).json(data);
      } else {
        res
          .status(500)
          .send({ errorMessage: `Can not find product by ${pid}` });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ errorMessage: `Can not find product by ${pid}` });
    }
  });

export default handler;
