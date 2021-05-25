var url_array_test = []; 
console.log("mainFunction.js here");

function addUrl() {
    inputfield = document.getElementById('inputfield').value;
    if (inputfield != "") {
        url_array_test.push(inputfield);
        console.log(url_array_test);
        clear();
        displayArray();
        updateInputField();
    }
    function clear() {
        inputfield = document.getElementById('inputfield').value = "";
        console.log("running clear");
    }
}

function displayArray() {
    var e = "<hr/>";   
    for (var i = 0; i<url_array_test.length; i++) {
        e += "Element " + i + " = " + url_array_test[i] + "<br/>";
    }
    document.getElementById("displayArray").innerHTML = e;
}

function clearUrlArray() {
    url_array_test = []; 
    console.log("running in clearUrlArray");
    console.log(url_array_test);
    displayArray();
}

// function SubmitUrlArray() {
//     console.log("running in submitUrlArray");
//     console.log(url_array_test); 
// }

function updateInputField() {
    var elem = document.getElementById("myField");
    elem.value = url_array_test;
}