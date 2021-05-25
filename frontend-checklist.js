var violations = [];

//HEAD section
async function checkDoctype(page) {
    //checking if doctype is declared
    //checks that the first <> tag is !doctype html
    o = {
        "checklistitem": "Doctype",
        "requirement": "The doctype is HTML5 and is at the top of all HTML pages.",
        "priority": "High",
        "testcase": "", 
        "info": ""
    }
    try {
        const pagecontent = await page.content();
        var doctype = pagecontent.substring(
            pagecontent.indexOf("<"),
            pagecontent.indexOf(">")+1
        );
        if (doctype.toLowerCase() == "<!doctype html>") {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.info = "<!doctype> is not declared at the top of the HTML page."
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to find <!doctype>. Please delcare it at the top of the HTML page."
        violations.push(o);
    }
}

async function checkCharset(page) {
    //checking if the charset has been declared as utf-8
    o = {
        "checklistitem": "Charset",
        "requirement": "The charset declared (UTF-8) is declared correctly.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const charset = await page.$eval("head > meta[charset]", element => element.getAttribute('charset'));
        if (charset.toLowerCase() == "utf-8") {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.info = "<meta> charset has not been declared as utf-8"
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail"
        o.info = "Unable to find <meta charset='utf-8'>. Please delare it within the HTML page"
        violations.push(o);
    }
}

async function checkViewport(page) {
    //checking if viewport content="width=device-width, initial-scale=1.0"
    o = {
        "checklistitem": "Viewport",
        "requirement": "The viewport is declared correctly for responsive web design.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const viewport = await page.$eval("head > meta[name='viewport']", element => element.content);
        if (viewport == "width=device-width, initial-scale=1.0" || "width=device-width, initial-scale=1") {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.info = "Declare <meta> viewport as 'width=device-width, initial-scale=1.0'";
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to find <meta> viewport tag."
        violations.push(o);
    }
}

async function checkTitle(page) {
    //checks if title has the words "HDB" or "Housing and Development Board"
    o = {
        "checklistitem": "Title",
        "requirement": "A title must be used on all pages.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const title = await page.title();
        if (title.includes ("HDB") || title.includes("Housing & Development Board")) {
            o.testcase = "Pass";
            o.info = "Title has been declared as: " + title;
        } else {
            o.testcase = "Fail";
            o.info = "This webpage does not have a proper title following HDB's standards."
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail. Unable to find title of webpage.";
        violations.push(o);
    }
}

async function checkDesc(page) {
    //prints description of webpage
    o = {
        "checklistitem": "Description",
        "requirement": "Ensure that meta description is provided. Meta description for each webpage is unique and accurately summarising the page content that both inform and interest the users if shown in search results.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const description = await page.$eval("head > meta[name='description']", element => element.getAttribute("content"));
        if (description != "") {
            o.testcase = "Pass";
            o.info = "Description of webpage is: " + description;
        } else {
            o.testcase = "Fail";
            o.info = "This webpage does not have a description.";
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to find <meta> description tag.";
        violations.push(o);
    }
}

async function checkFavicon(page) {
    //checking if favicon has been included
    //checks if favicon link is the correct link
    //different favicon link for homepage and e-services
    o = {
        "checklistitem": "Favicon",
        "requirement": "Ensure to use HDB favicon and that it displays correctly. Do refer to the HDB Favicon guide and download the Favicon.",
        "priority": "Medium",
        "testcase": "",
        "info": "",
    }
    try {
        // const eservice = await page.$eval()

        const favicon_link = await page.$eval("head > link[rel='icon']", element => element.getAttribute("href"));
        if (favicon_link == "/html/Dashboard/Foundation/Theming/images/favicon.ico" || "/favicon.ico") {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.testcase = "This webpage does not have the correct HDB favicon.";
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to find <link> icon tag.";
        violations.push(o);
    }
}

async function checkAltLang(page) {
    //prints out alternate language of webpage
    o = {
        "checklistitem": "Alternate language",
        "requirement": "The language tag of the website is specified and related to the language of the current page.",
        "priority": "Low",
        "testcase": "",
        "info": ""
    }
    try {
        const altLang = await page.$eval("html", element => element.getAttribute("lang"));
        if (altLang != "") {
            o.testcase = "Pass";
            o.info = "Alternate language of webpage is: " + altLang;
        } else {
            o.testcase = "Fail";
            o.info = "Alternate language of webpage is not declared.";
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to find <html> lang tag."
        violations.push(o);
    }
}

async function checkCommonHead(page) {
    //checks if common head script is present in HTML
    //prints out first line of code that is within <script> tags
    //only e-service webpages have common header scripts
    o = {
        "checklistitem": "Common Head Script",
        "requirement": "Ensure that head common script is added and placed correctly within the <head> section of the HTML page.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        var head = await page.evaluate(() => Array.from(document.querySelectorAll("head > script"), e => e.src))
        for (var i = 0; i < head.length; i++) {
            if (head[i] == "https://services2.hdb.gov.sg/web/fi10/infoweb/common/js/FI10Zhead.js") {
                o.testcase = "Pass";
                violations.push(o);
                return;
            }
        }
        o.testcase = "Fail";
        o.info = "The common head script is not within the HTML document, or this page is not an e-Service webpage.";
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to retrieve <script> tags.";
        violations.push(o);
    }
}

//HTML section
async function cleanUpComments(page) {
    //printing all comments in HTML file
    //includes conditional comments as well
    o = {
        "checklistitem": "Clean up comments",
        "requirement": "Unnecessary code needs to be removed before sending the page to production.",
        "priority": "Low",
        "testcase": "",
        "info" : ""
    }
    try {
        const pagecontent = await page.content();
        var pattern = /<!--[\s\S]*?-->/g;
        var comments = pagecontent.match(pattern);
        // console.log(comments);
        if (comments == null) {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.info = "There are still comments within the code.";
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "There has been an error finding the comments in the HTML page."
        violations.push(o);
    }
}

async function checkSimpleURL(page) {
    //prints out current url of page
    o = {
        "checklistitem": "URLs",
        "requirement": "Use simple URLs that convey content information for web-based digital services.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const pageURL = await page.url();
        o.testcase = "Pending";
        o.info = "Plese check if the following URL is acceptable. URL: " + pageURL;
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to find page URL.";
        violations.push(o);
    }
}

async function checkUpdatedDate(page) {
    //prints out the last updated date of the page
    //date stamp should not be more than 24 months from date of access
    o = {
        "checklistitem": "Last updated date",
        "requirement": "Display a last updated/reviewed date stamp at the end of webpages in web-based informational services to indicate the currency of the content.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const lastReview = await page.evaluate(() => Array.from(document.querySelectorAll('.last-review > p'), element => element.textContent));
        const remove2words = words => words.split(" ").slice(2).join(" ");
        const lastReviewedDate = remove2words(lastReview[1]);
    
        const currentDate = new Date();
        const latestPossibleDate = new Date().setFullYear(currentDate.getFullYear() - 2);
        const lastDate = new Date(lastReviewedDate);
    
        //lastDate is the last reviewed date of the page
        //latestPossibleDate is the oldest date before the page needs to be re-updated
        //if lastDate is more recent that latestPossibleDate, test passes
        if (lastDate >= latestPossibleDate) {
            o.testcase = "Pass";
            o.info = "Page was last updated on " + lastReviewedDate + ", which is within the last 2 years.";
        } else {
            o.testcase = "Fail";
            o.info = "Page was last updated on " + lastReviewedDate + "which is not within 2 years, and needs to be re-updated.";
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to retrieve last updated date of page.";
        violations.push(o);
    }
}

//WEBFONT section
async function checkWebfont(page) {
    //ensures that the HDB "cabin" font is used
    o = {
        "checklistitem": "Webfont",
        "requirement": "Ensure that HDB's 'Cabin' font is utilised.",
        "priority": "High",
        "testcase": "",
        "info": "",
    }
    try {
        const cabinFont = "family=cabin";
        const font = await page.$eval("head > link[rel='stylesheet']", element => element.getAttribute("href"));
        if (font.toLowerCase().includes(cabinFont)) {
            o.testcase = "Pass"
        } else {
            o.testcase = "Fail"
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail"
        o.info = "Unable to find <link> stylesheet tag."
        violations.push(o);
    }
}

//CSS section 
async function checkInlineCSS(page) {
    //checks if there is any embedded/inline css within the HTML file
    o = {
        "checklistitem": "Embedded or inline CSS",
        "requirement": "Avoid embedding CSS in <style> tags or using inline CSS.",
        "priority": "Medium",
        "testcase": "",
        "info": ""
    }
    try {
        const pagecontent = await page.content();
        var pattern = /style="[\s\S]*?"/g;
        var inlinecss = pagecontent.match(pattern);
        var colorcss = [];
        for (var i = 0; i < inlinecss.length; i++) {
            if (inlinecss[i].includes("color")) {
                colorcss.push(inlinecss[i]);
            }
        }
        if (inlinecss == null) {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail"
            o.info = "There is inline/embedded CSS present.";
        }
        // console.log(inlinecss);
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail"
        o.info = "Unable to find inline CSS style attributes.";
        violations.push(o);
    }
}

//JAVASCRIPT section
async function checkCommonHeader(page) {
    //checks if common header script is present in HTML
    //prints out first line of code that is within <script> tags
    //only e-service webpages have common header scripts
    o = {
        "checklistitem": "Common Header Script",
        "requirement": "Ensure that common header script is added and placed correctly within the start of the <body> section of the HTML page.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const header = await page.$eval("body > script", element => element.getAttribute("src"));
        if (header == "/web/fi10/infoweb/common/js/FI10Zheader.js") {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.info = "The common header script is not placed at the top of the <body> section, or this page is not an e-Service webpage.";
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to retrieve the <script> tag within the <body> section."
        violations.push(o);
    }
}

async function checkCommonFooter(page) {
    //checks if common footer script is present in HTML
    //only e-services webpages have commone footer scripts
    o = {
        "checklistitem": "Common Footer Script",
        "requirement": "Ensure that head common script is added and place correctly within the end of the <body> section of the HTML page.",
        "priority": "High",
        "testcase": "",
        "info": "",
    }
    try {
        var footer = await page.evaluate(() => Array.from(document.querySelectorAll("body > script"), e => e.src))

        for (var i = 0; i < footer.length; i++) {
            if (footer[i] == "https://services2.hdb.gov.sg/web/fi10/infoweb/common/js/FI10Zfooter.js") {
                o.testcase = "Pass";
                violations.push(o);
                return;
            }
        }
        o.testcase = "Fail";
        o.info = "The common footer script is not within the HTML document, or this page is not an e-Service webpage.";
        violations.push(o);
        // console.log(footer);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to retrieve <script> tags.";
        violations.push(o);
    }
}

async function checkInlineJS (page) {
    //checks if there is inline JavaScript present
    //checks for code/functions within <script> tags
    o = {
        "checklistitem": "JavaScript inline",
        "requirement": "Ensure there is no JavaScript code inline, mixed with HTML code.",
        "priority": "Medium",
        "testcase": "",
        "info": ""
    }
    try {
        const pagecontent = await page.content();
        var pattern = /<script>[\s\S]*?<\/script>/g;
        var inlineJS = pagecontent.match(pattern);
        if (inlineJS == null) {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            info = "There is inline/embedded JavaScript present: " + inlineJS;
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to find inline JavaScript <script> tags."; 
        violations.push(o);
    }
}

//MEDIA section
async function checkAltText(page) {
    //searches for all image tag sources and image tag alternante texts
    //passes if there is at least one image tag with no alt text
    //TODO: print out <img> src for images with no alternate texts for easy detection and correction
    o = {
        "checklistitem": "Alternative Text",
        "requirement": "All <img> tags have an alternative text which describe the image visually.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        var imgTagsSrc = await page.evaluate(() => Array.from(document.querySelectorAll("img"), e => e.src))
        var imgTagsText = await page.evaluate(() => Array.from(document.querySelectorAll("img"), e => e.alt))
    
        var count = 0;
        var imgTagsArr = [];
        for (var i = 0; i < imgTagsSrc.length; i++) {
            if (imgTagsText[i] == "") {
                count++;
                imgTagsArr.push(imgTagsSrc[i]);
            }
        }
        if (count == 0) {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.info = "There are images that do not have alternate texts."
            // o.links = imgTagsArr;
        }
        violations.push(o);
    } catch (err) {
        o.testcase = "Fail";
        o.info = "Unable to retrieve <img> tags.";
        violations.push(o);
    }
}

async function clearArray() {
    violations = [];
}

module.exports = { 
    checkDoctype, checkCharset, checkViewport, checkTitle, checkDesc, checkFavicon, checkAltLang, checkCommonHead,
    cleanUpComments, checkSimpleURL, checkUpdatedDate, 
    checkWebfont, 
    checkInlineCSS,
    checkCommonHeader, checkCommonFooter, checkInlineJS,
    checkAltText,
    clearArray, violations
 };