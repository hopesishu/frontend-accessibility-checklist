# 📋 Frontend Automation Tool
## About
The Frontend Automation Tool automates the checking of common frontend checks (Example: https://frontendchecklist.io). At the same time, this tool automates accessibility testing checks, according the Web Content Accessibility Guidelines (WCAG) 2.1.

## Technologies Used
1. NodeJS - Backend 
2. Express - NodeJs Framework for handling POST requests
3. Bootstrap - Frontend Framework for styling components
4. Axe-Core - External library to test for components against WCAG guidelines (Github link: https://github.com/dequelabs/axe-core)
5. EJS - Templating engine for displaying JSON data 



## Installation
1. Open the command prompt and change the current working directory to the location where you want the cloned directory
2. In the command prompt, type `git clone https://github.com/hopesishu/frontend-accessibility-checklist.git`
3. Press <kbd>Enter</kbd> to create your local clone

## Setting Up
The Frontend Automation Tool will access the webpage that the user has been input, and check that they align with the frontend checklist rules, as well as the guidelines set by Axe-Core (e.g. WCAG2.0 Level A/AA). To start using this program, run the following commands:

```shell
#Navigate into the project directory
cd frontend-accessibility-checklist

#Run the server to open the localhost in your browser
npm start
```

Open localhost:3000 in your browser.

