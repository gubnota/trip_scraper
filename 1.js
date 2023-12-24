// const puppeteer = require("puppeteer");
// const fs = require('fs').promises;
// const sleep = (milliseconds) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto("https://dzen.ru", {
//     // waitUntil: "networkidle2",
//   });

// //   await page.type("#identifierId", "YOUR_EMAIL_OR_USERNAME");
// //   await page.click("#identifierNext");

// //   await page.waitForSelector("#password", {
// //     visible: true,
// //     hidden: false,
// //   });
// //   await page.type(
// //     "#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input",
// //     "YOUR_PASSWORD"
// //   );
// //   await sleep(1000);
// //   await page.click("#passwordNext > div > button");

// //   await sleep(10000);
//   await sleep(500);
//   //save cookies
//   var cookies = await page.cookies();
//   await fs.writeFile('./cookies.txt', JSON.stringify(cookies, null, 2));

//     //load cookies
//     const cookiesString = await fs.readFile("./cookies.json");
//     var cookies = JSON.parse(cookiesString);
//     await page.setCookie(...cookies);
// console.debug(cookies);
//   await browser.close();
// })();

