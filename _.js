const axios = require("axios");
const { getSotckByFormat, getStockByAvail } = require("./helpers");

const getBurton = async () => {
  try {
    const res = await axios.get(
      "https://www.burton.com/on/demandware.store/Sites-Burton_NA-Site/en_CA/Product-GetVariationJSON?pid=W22-219571"
    );

    const result = res.data;
    const { data } = result;
    const { variations } = data;
    const stock = variations.variationValues;
    const filter = getSotckByFormat(stock);
    const avail = getStockByAvail(filter);

    console.log(avail);
  } catch (error) {
    console.log("this is 404");
  }
};

// const alert = setInterval(getBurton, 1000 * 5);
getBurton();
