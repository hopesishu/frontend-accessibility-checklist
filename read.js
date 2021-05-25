var readline = require('readline-sync');

function read_array() {
    console.log("Welcome to the Front-end Checklist!");
    console.log("We recommend using Chrome browser for the best experience.");

    var url = '';
    var url_array = [];
    console.log("Please enter the URL(s) you want to access. Enter '!' when done.");
    while (url != "!") {
        var url = readline.question("URL: ");  
        url_array.push(url);
    }
    url_array.pop();
    console.log(`Accessing ${url_array}...`);
    return(url_array);
}

module.exports = { read_array };