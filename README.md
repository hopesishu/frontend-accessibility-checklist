# 📋 Front-End Automation Tool
The Frontend Automation Tool automates the checking of common frontend checks, as well as checks documented from HDB’s Frontend Governance Checklist. At the same time, this tool automates accessibility testing checks, ensuring that HDB’s webpages are web content accessible.

## Installation
1. Open the command prompt and change the current working directory to the location where you want the cloned directory
2. In the command prompt, type `git clone https://github.com/hopesishu/frontend-automation.git`
3. Press <kbd>Enter</kbd> to create your local clone

## Setting Up
The Front-End Automation Tool will access the webpage(s) that the user has been input, and check that they align with HDB's Frontend Governance checklist guidelines, as well as the guidelines set by Axe-Core (e.g. WCAG2.0 Level A/AA). To start using this program, run the following commands:

```shell
#Navigate into the project directory
cd frontend-automation

#Run the program to input website's URL
node index
```

### Sample Output

```
C:\Users\username> cd frontend-automation
C:\Users\username\frontend-autmation> node index
Welcome to the Front-end Checklist!
We recommend using Chrom browser the best experience.
Please enter the URL(s) you want to access. Enter '!' when done.
URL: https://www.hdb.gov.sg/cs/infoweb/homepage
URL: !

```
The program will visit the URL(s) as input by the user, and generate the reaults for each webpage(s). After results has been generated and saved in to a JSON file, users can then view the report by opening the HTML report on their local browsers.

```shell
#After receiving a result that is in JSON in the console, 
#Run the next command to see the result displayed in an HTML report
node server
```
The HTML report can be accessed by opening localhost:3000 in their browser.

## External Libraries Used
- Axe-core (Github link: https://github.com/dequelabs/axe-core)


