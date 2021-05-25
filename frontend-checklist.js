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
    //checks if title is present
    o = {
        "checklistitem": "Title",
        "requirement": "A title must be used on all pages.",
        "priority": "High",
        "testcase": "",
        "info": ""
    }
    try {
        const title = await page.title();
        if (title != "") {
            o.testcase = "Pass";
            o.info = "Title has been declared as: " + title;
        } else {
            o.testcase = "Fail";
            o.info = "This webpage does not have a title"
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
        "requirement": "Ensure the webpage has a favicon and that it displays correctly.",
        "priority": "Medium",
        "testcase": "",
        "info": "",
    }
    try {
        const favicon_link = await page.$eval("head > link[rel='icon']", element => element.getAttribute("href"));
        if (favicon_link == "/favicon.ico") {
            o.testcase = "Pass";
        } else {
            o.testcase = "Fail";
            o.testcase = "This webpage does not have a favicon.";
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
    checkDoctype, checkCharset, checkViewport, checkTitle, checkDesc, checkFavicon, checkAltLang,
    cleanUpComments, checkSimpleURL,
    checkInlineCSS,
    checkInlineJS,
    checkAltText,
    clearArray, violations
 };