import { Browser } from "puppeteer";
import { getBrowser } from "../lib/BrowserEnv";

export const getNews = async () => {
  let previousHeight;
  let items: any[] = [];
  const scrollDelay = 600;
  const itemCount = 30;
  const url = "https://www.bing.com";
  const main = async () => {
    const browser: Browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto(
      "https://www.bing.com/news/search?q=covid+india&qs=SS&form=QBNT&sp=1&ghc=1&lq=0&pq=covid+i&sc=8-7&cvid=C4FA65AF3DDC4FFEBE08DB0494E374F4"
    );
    while (items.length < itemCount) {
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.waitForFunction(
        `document.body.scrollHeight > ${previousHeight}`
      );
      // await page.waitForTimeout(scrollDelay);
      new Promise((r) => setTimeout(r, scrollDelay));
      const news = await page.evaluate((url) => {
        const newsList = Array.from(document?.querySelectorAll(".news-card"));

        const data = newsList.map((news) => {
          return {
            image:
              url + news.querySelector(".imagelink>img")?.getAttribute("src") ||
              "",
            title: news.querySelector(".caption a.title")?.textContent || "",
            description: news.querySelector(".snippet")?.textContent || " ",
            url:
              news.querySelector(".caption a.title")?.getAttribute("href") ||
              " ",
            validTill: new Date().getTime() + 1000 * 60 * 60 * 6,
          };
        });
        return data;
      }, url);
      items = [...items, ...news];
    }
    await page.close();
    return items;
  };

  const data = await main();
  return data;
};
