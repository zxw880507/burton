import nc from "next-connect";
import cors from "cors";
import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post((req, res) => {
    const { phoneNumber } = req.query;
    const { demand } = req.body;

    let list = demand.reduce((accu, el, index) => {
      const { name, size, color, addToCartLink } = el;
      if (index) {
        accu += "\n\n";
      }
      let part = `${name}\nsize: ${size}\ncolor: ${color}\naddToCartLink: https://www.burton.com${addToCartLink}.html`;
      accu += part;

      return accu;
    }, "");

    client.messages
      .create({
        to: `+1${phoneNumber}`,
        from: twilioNumber,
        body: `您查询的商品已经补货，刚快去抢货:\n\n${list}`,
      })
      .then((message) => {
        res.status(200).json("message sent");
      })
      .catch((err) => {
        res.status(500).send({ errorMessage: `message sent failed` });
      });
  });

export default handler;
