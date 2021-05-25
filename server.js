const express = require("express");
const bodyparser = require('body-parser');
const path = require("path");
const app = express();
var FrontendResults = require("./public/javascript/frontend_data.json");
var AxecoreResults = require("./public/javascript/axecore_data.json");

const indexServer = require('./index.js');

// const mainFunctions = require('./public/javascript/mainFunctions.js');
// const url_array_test = mainFunctions.url_array_test;
// const { url_array_test } = require('./public/javascript/mainFunctions.js');


// view engine setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  urlArray = []; //clears url array
  res.render("home");
});

var urlArray = [];
// when add button is pressed
app.post("/add", (req, res) => {
  try {
    var getUrl = req.body.url;
    if (getUrl != "") {
      urlArray.push(getUrl);
    }
    console.log("getUrl: ", getUrl);
    console.log("urlArray: ", urlArray);
    getUrl = ""; //clear variable to prevent repeat input
    res.render("home", { 
      'urlArray': urlArray 
    });
  } catch (error) {
    console.log(error);
  }
});

// when submit button is pressed
app.post("/submit", async (req, res) => {
  console.log("submit button pressed");

  try {
    getUrl = req.body.url;
    if (getUrl != "") {
      urlArray[0] = getUrl;
    }
    console.log("getUrl: ", getUrl);
    console.log("urlArray: ", urlArray);
    exports.urlArray = urlArray;  // send urlArray into index.js file

    if (urlArray.length == 0) {
      res.render("home", {
        errorMessage: "The domain name cannot be empty."
      })
    }

    await indexServer.monitor();


    res.redirect("/results");  // redirect to result page
    // res.render("index");
  } catch (error) {
    urlArray = [];
    res.render("home", {
      errorMessage: "Cannot access the URL provided. Please provide a proper URL.",
      'urlArray': urlArray,
    });
    res.redirect("/");
    console.log(error);
  }
});

app.post("/clear", (req, res) => {
  try {
    console.log("clear button pressed");
    urlArray = []; //clears url array
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

app.get("/results", async (req, res) => {
  try {
    console.log("the results page is rendered")
    res.render("index", {
      'FEdata': FrontendResults,
      'ACdata': AxecoreResults
    }); // index refers to index.ejs
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});


