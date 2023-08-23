import express from "express"
const app=express();
import cors from "cors"
const Port=8095;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
import puppeteer from "puppeteer";



let store=[];

(async()=>{
    const browser=await puppeteer.launch({headless:true});
    const page=await browser.newPage();
    await page.goto("https://www.bookstores.com/browse/books/",{
        waitUntil:'load',
        timeout:0
    });

    store=await page.evaluate(()=>{
        const bookspace=Array.from(document.querySelectorAll('.bestsellers-item'));
        const data=bookspace.map((book)=>({
         title:book.querySelector('.bestsellers-item-title').innerText,
         img:book.querySelector('.bestsellers-item-cover-wrap img').getAttribute('src'),
        }))

        return data;
    }); 

    await browser.close();

})();

let textbooks=[];

(async()=>{
    const browser=await puppeteer.launch({headless:true});
    const page=await browser.newPage();
    await page.goto("https://www.bookstores.com/browse/textbooks/",{
        waitUntil:'load',
        timeout:0
    });

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

let games=[];

(async()=>{
    const browser=await puppeteer.launch({headless:true});
    const page=await browser.newPage();
    await page.goto("https://www.bookstores.com/browse/games/",{
        waitUntil:'load',
        timeout:0
    });

    games=await page.evaluate(()=>{
        const bookspace=Array.from(document.querySelectorAll('.bestsellers-item'));
        const data=bookspace.map((book)=>({
         title:book.querySelector('.bestsellers-item-title').innerText,
         img:book.querySelector('.bestsellers-item-cover-wrap img').getAttribute('src'),
        }))

        return data;
    }); 

    await browser.close();

})();

let movies=[];

(async()=>{
    const browser=await puppeteer.launch({headless:true});

    const page=await browser.newPage();

    await page.goto('https://www.bookstores.com/search/search-results.aspx?format=DVD&pt=2',{
        waitUntil:'load',
        timeout:0
    });

    movies=await page.evaluate(()=>{
        const moviedata=Array.from(document.querySelectorAll('.itemListingDiv'));

        const data=moviedata.map((movie)=>({
           title:movie.querySelector('.productListingInfo .searchTitleSpan.blue.truncate a').innerHTML,
           img:movie.querySelector('#imageAndMobileType span img').getAttribute('src'),
        }));

        return data;
    })


    await browser.close();
})();


app.get("/",(req,res)=>{
    res.send("Welcome to the Home Page");
});

app.get("/textbooks",(req,res)=>{
    res.send(textbooks);
});

app.get("/books",(req,res)=>{
    res.send(store);
});

app.get("/games",(req,res)=>{
    res.send(games);
});

app.get("/movies",(req,res)=>{
    res.send(movies);
});

const listen=(()=>{
    app.listen(Port,()=>{
        console.log(`Server is running at the port number ${Port}`);
    })  
})

setTimeout(listen,30000);