import { getBrowser } from "../lib/BrowserEnv";

export const getCovidData = async () => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/coronavirus/");
  const data = await page.evaluate(() => {
    const table = document.querySelector(
      "#main_table_countries_today > tbody:nth-child(2)"
    );

    if (!table) return [];

    const rows = Array.from(
      table.querySelectorAll("tr[role=row]:not(.row_continent)")
    );
    const list = rows.slice(0, 17).map((row) => {
      return {
        country: row.querySelector("td:nth-child(2)")?.textContent,
        totalCases: row.querySelector("td:nth-child(3)")?.textContent,
        totalDeaths: row
          .querySelector("td:nth-child(5)")
          ?.textContent?.trimEnd(),
        totalRecovered: row.querySelector("td:nth-child(7)")?.textContent,
        activeCases: row.querySelector("td:nth-child(8)")?.textContent,
        validTill: new Date().getTime() + 1000 * 60 * 60 * 6,
      };
    });
    return list;
  });
  await page.close();
  return data;
};
