import { app } from "./index.js";

import puppeteer from "puppeteer";
let textbooks;

(async()=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    const url="https://www.bookstores.com/browse/textbooks/";
    await page.goto(url);

      textbooks=await page.evaluate(()=>{
        const bookspace=Array.from(document.querySelectorAll('.bestsellers-item'));
        const data=bookspace.map((book)=>({
         title:book.querySelector('.bestsellers-item-title').innerText,
         img:book.querySelector('.bestsellers-item-cover-wrap img').getAttribute('src'),
        }))

        return data;
    }); 

    await browser.close();

})();

app.get("/textbooks",(req,res)=>{
    res.send(textbooks);
})