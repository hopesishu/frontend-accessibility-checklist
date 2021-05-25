const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');
const util = require('util'); //util expands the array in JSON file 
const fs = require('fs');
const log = console.log;

async function axecoreFunc(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setBypassCSP(true);
  
    await page.goto(url);
  
    const results = await new AxePuppeteer(page)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

    delete results.passes;
    delete results.inapplicable;
    delete results.incomplete;

    // for (var i = 0; i < results.violations.length; i++) {
    //     log(chalk.red(i+1 + ". "+ results.violations[i].id));
    //     log("impact: " + results.violations[i].impact);
    //     log("description: " + results.violations[i].description);
    //     log("help: " + results.violations[i].help);
    //     log("helpURL: " + results.violations[i].helpUrl);
    //     log("");
        
    //     console.log("There are " + results.violations[i].nodes.length + " node(s) found that failed the accessibility test.");
    //     for (var j = 0; j < results.violations[i].nodes.length; j++) {
    //         var number = j+1;
    //         log("Node " + number);
    //         log("impact: " + results.violations[i].nodes[j].impact);
    //         log("html: " + results.violations[i].nodes[j].html);
    //         log("target: " + results.violations[i].nodes[j].target);
    //         log("failure summary \n" + results.violations[i].nodes[j].failureSummary);
    //         log("");
    //     }
    // } 

    await page.close();
    await browser.close();
    return results;
}

module.exports = { axecoreFunc };
