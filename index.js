const puppeteer = require('puppeteer');
const axecore = require('./axecore-function.js');
const functions = require('./frontend-checklist.js');
const { violations } = require('./frontend-checklist.js');
const fs = require('fs');
const util = require('util'); //util expands the array in JSON file 

const serverArray = require('./server.js');

async function configureBrowser(url) { 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

var FrontendResult = [];
var AxecoreResult = [];

async function monitor() {
    const url_array = serverArray.urlArray;
    for (let i = 0; i < url_array.length; i++) {
        console.log("url_array:", url_array[i]);
    }

    // var FrontendResult = [];
    // var AxecoreResult = [];

    //url_list -> url_array
    for (let i = 0; i < url_array.length; i++) {
        console.log("running in the frontend checklist function");
        url = url_array[i];
        let page = await configureBrowser(url);
        await functions.checkDoctype(page);
        await functions.checkCharset(page);
        await functions.checkViewport(page);
        await functions.checkTitle(page);
        await functions.checkDesc(page);
        await functions.checkFavicon(page);
        await functions.checkAltLang(page);
        await functions.cleanUpComments(page);
        await functions.checkSimpleURL(page);
        await functions.checkInlineCSS(page);
        await functions.checkInlineJS(page);
        await functions.checkAltText(page);

        var webpage = new Object();
        webpage.url = url_array[i];
        webpage.violations = violations;
        FrontendResult.push(webpage);
        await functions.clearArray();

        var ac_webpage = await axecore.axecoreFunc(url);
        AxecoreResult.push(ac_webpage);
    }
    fs.writeFile("public/javascript/frontend_data.json", JSON.stringify(FrontendResult), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The frontend checklist data file was saved!");
    }); 
    fs.writeFile("public/javascript/axecore_data.json", JSON.stringify(AxecoreResult), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The axecore data file was saved!");
    }); 
    
    // console.log(util.inspect(FrontendResult, false, null, true));
    // console.log(util.inspect(AxecoreResult, false, null, true));
    // console.log("Automation complete! You may now close this window.");
}

// monitor();

module.exports = { monitor };
