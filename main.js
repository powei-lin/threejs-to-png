const puppeteer = require("puppeteer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// show args
const args = require("args-parser")(process.argv);
console.log(args);
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

async function main() {
  // mkdir
  await fs.mkdir(path.resolve("screenshots"), () => {
    console.log("create screenshot");
  });

  // create express
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json({ limit: "25mb" }));
  app.use("/scene", express.static(__dirname + "/scene"));

  app.get("/frame", (req, res) => {
    var tryFetch = { frame: args.n };
    res.json(tryFetch);
  });

  app.post("/", async (req, res) => {
    const { img, frame } = req.body;

    try {
      const data = img.replace(/^data:image\/png;base64,/, "");
      const f = ("000" + frame).slice(-4);
      var buf = Buffer.from(data, "base64");
      await fs.writeFile(
        path.resolve(path.join("screenshots", `frame${f}.png`)),
        buf,
        () => {}
      );

      console.log("write frame", f);
    } finally {
      res.send();
    }
  });

  // const listen = new ExpressListen(app)
  app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);

    // start puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--use-gl=egl"],
    });
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
      width: 600,
      height: 800,
      deviceScaleFactor: 1,
    });

    // wait for the "DONE" log of the scene
    page.on("console", async (message) => {
      if (message.text() === "DONE") {
        await page.close();
        await browser.close();

        // await listen.kill()

        console.log("> DONE!");
        process.exit(0);
      }
    });

    // await page.setUserAgent('puppeteer')
    const web_url = `http://localhost:${port}/scene/index.html`;
    await page.goto(web_url);
  });

  // app.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}`)
  // })

  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  // const web_url = `http://localhost:${port}/scene/index.html`;

  // await page.goto(web_url);
  // await page.waitForTimeout(5000);
  // await page.screenshot({ path: 'example.png' });

  // await browser.close();
}
main();
