import axios from "axios";
import * as cheerio from "cheerio";
import { log } from "console";

const getData = async () => {
  try {
    const response = await axios.get(
      "https://www.amazon.in/s?k=smart+watches&ref=nb_sb_noss_1",
      {
        headers: { "Content-type": "text/html" },
      }
    );
    // log(response.data);
    const $ = cheerio.load(response.data);
    const cards = ($("div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16"));
    const titles = cards.each((idx, el) => {
        const title = $(el["class=a-size-medium a-color-base a-text-normal"]);
        log(title.text());
    })
    return data;
  } catch (err) {
    log(`Error occured while fetching the data : ${err}`);
  }
};

getData();

// let data;

// const getProductDetails = async () => {
//   try {
//     const data1 = await getData();
//     data = data1;
//     log(data);
//   } catch (error) {
//     log(error);
//   }
// };
