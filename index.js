import axios from "axios";
import * as cheerio from "cheerio";
import { log } from "console";
import { zip } from "custom-array-utils";
import xlsx from "xlsx";

let titleArray = [];
let priceArray = [];
let ratingArray = [];

let sheetData = [["Price", "Title", "Rating"]];
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
    const titles = $("span.a-size-medium.a-color-base.a-text-normal");
    // const titles = cards.each((idx, el) => {
    //     const title = $(el["class=a-size-medium a-color-base a-text-normal"]);
    //     log(title);
    // })
    // log(titles);

    titles.each((idx, el) => {
      titleArray.push($(el).text());
    });

    const ratings = $(
      "i.a-icon.a-icon-star-small.a-star-small-4.aok-align-bottom span.a-icon-alt"
    );
    ratings.each((idx, el) => {
      if (idx < 16) {
        ratingArray.push($(el).text());
      }
    });

    const prices = $(
      "a.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-offscreen"
    );
    prices.each((idx, el) => {
      if (idx < 16) {
        priceArray.push($(el).text());
      }
    });

    const finalData = zip(priceArray, titleArray, ratingArray);
    sheetData = [...sheetData, ...finalData];

    // Create a new workbook
    const workbook = xlsx.utils.book_new();

    const sheet = xlsx.utils.aoa_to_sheet(sheetData);

    // Append the sheet to the workbook
    xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");

    // Save the workbook to a file
    xlsx.writeFile(workbook, "output.xlsx");

    console.log("XLSX file created successfully!");
  } catch (err) {
    log(`Error occured while fetching the data : ${err}`);
  }
};

getData();

