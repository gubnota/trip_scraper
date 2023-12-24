import  { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
const StealthPlugin = require("puppeteer-extra-plugin-stealth") 
puppeteer.use(StealthPlugin())
declare const window : any
import * as fs from 'fs';
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class Helper {
    private static instance: Helper;
    public browser: Browser;
    public page: Page;
    public cookiePath = "cookies.json";
    public pages:Page[] = [];
    public no:number = 0;
    public currentPage:number = 0;
    private constructor() {
    }
    static getInstance() {
        if (!Helper.instance) {
            Helper.instance = new Helper();
        }
        return Helper.instance;
    }
    async loadCookies ()  {
        const fs = require('fs');
      const cookiesString = await fs.readFileSync(this.cookiePath);
      var cookies = JSON.parse(cookiesString);
      await this.page.setCookie(...cookies);
var a = fs.readFileSync('localStorage.json');
var b = JSON.parse(a);
for (var prop in b) {
    console.debug(`localStorage.setItem('${prop}', ${JSON.stringify(b[prop])});`);
    // console.error(JSON.stringify(b[prop]));
    await this.page.evaluate(`localStorage.setItem('${prop}', ${JSON.stringify(b[prop])});`);
  }
    }
        async operate (currentPage:number) {//ids:number[]
            const fs = require('fs');
            this.currentPage = currentPage
            if (fs.existsSync('dump.json')) fs.unlinkSync('dump.json');
            // await fs ('dump.json
        const browser = await puppeteer.launch({headless: false,
            executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    //@ts-ignore
    this.browser = browser;
        this.page = await this.browser.newPage();
        global.page = this.page;
        await this.page.setViewport({ width: 1920, height:1080});
        await this.page.setDefaultNavigationTimeout(0); 
          await this.page.setRequestInterception(true);
          this.page.on('response', async response => {
            let http = await response;
            if(!fs.existsSync('data/'+this.currentPage)) fs.mkdirSync('data/'+this.currentPage);
            // console.log("request", http.request);
            let url = await http.url();
            if (url.search("getCommentList")>-1 || url.search("translate")>-1){
                let out =  await http.json();
                if(url.search("getCommentList")>-1){
                    await fs.writeFileSync(`data/${currentPage}/getCommentList-${this.no}.json`, JSON.stringify(out, null, 2));
                    this.no++;
                    // console.log(out.data.commentTagList)
                }
                else {
                    // console.log("await http.json()",out);
                    await fs.writeFileSync(`data/${currentPage}/translate-${this.no}.json`, JSON.stringify(out, null, 2));
                    this.no++;
                }
            }
          }
          );
        this.page.on('request', interceptedRequest => {
            if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg') 
            || interceptedRequest.url().endsWith('.woff2')
            || interceptedRequest.url().endsWith('.svg')
            || interceptedRequest.url().endsWith('.webp')
            || interceptedRequest.url().endsWith('facebook.sdk.v1006418595.js')
            || interceptedRequest.url().endsWith('.mp4')
            )
              interceptedRequest.abort();
            else
              interceptedRequest.continue();
        });

          await this.page.goto(`https://www.trip.com/hotels/detail/?hotelId=${currentPage}&checkIn=2023-12-26&checkOut=2023-12-28`);
        await this.page.click('.detail-headreview-ab_num');

        await this.page.evaluate(async () =>{
            async function iterateThroughAllTranslateButtonsOnAPage() {
                var els = document.querySelectorAll(".m-translate");
                for (let i = 0; i < els.length; i++) { 
                  await new Promise(resolve => setTimeout(resolve, 300));
                  //@ts-ignore
                  if(els[i].innerText!=null && els[i].innerText == "Translate") if(els[i]!=null) await els[i].click();
                }      
            };
            async function iterateThroughAllPages() {                
                do {
                    var next_page = document.querySelector(".forward.active");
                    await new Promise(resolve => setTimeout(resolve, 100));
                      //@ts-ignore
                      if (next_page != null) next_page.click();
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        await iterateThroughAllTranslateButtonsOnAPage();
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
            while (next_page != null) 
            };
        
            await iterateThroughAllTranslateButtonsOnAPage()
            await iterateThroughAllPages();
            await new Promise(resolve => setTimeout(resolve, 2000));
        });
          await sleep(1000);

    }    
}

export {Helper, sleep}
