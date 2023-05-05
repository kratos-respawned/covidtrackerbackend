import { Browser, executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

export const getBrowser = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: "new",
    executablePath: executablePath(),
  });
  return browser;
};
