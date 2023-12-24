import  { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
const StealthPlugin = require("puppeteer-extra-plugin-stealth") 
puppeteer.use(StealthPlugin())
