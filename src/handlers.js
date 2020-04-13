
const url = require("url");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring")
const hostAndPaths = {
    search: "http://api.giphy.com/v1/gifs/search",
    autoComplete: "http://api.giphy.com/v1/gifs/search/tags",
    suggestions: "api.giphy.com/v1/tags/related/"
};

const key = "ZrUrI0GTfFYUKWIV78zDckNWUQ2DLfBo"



function home(request, response) {

    let mainPagePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(mainPagePath, (error, data) => {
        if (error) {
            badRequest(request, response);
            return;
        }

        response.writeHead(200, { "content-type": "text/html" })
        response.end(data)

    })

}
function resources(request, response) {

}
function notFound(request, response) {
    //error 404
}
function badRequest(request, response) {
    //error 400
}


function getAutoComplete(request, response) {

    let search = url.parse(request.url).search;
    let params = querystring.parse(search);
    fetchFromApi({ q: params.q, api_key: key }, (error, response) => {
        if (error) {
            badRequest(request, response)
        } else {
            let suggestionsArr = Array.from(response.data.data).map(sug => sug.name);
            console.log(suggestionsArr);
            response.writeHead(200, {"content-type": "application/json"});
            response.end(suggestionsArr)
        }
    })


    // call fetchSuggestionsFromApi()
}
function getSuggestions(request, response) {

}

// function fetchFromApi(searchStr, params = {}, cb) {

function fetchFromApi(params = {}, cb) {
    let urlObj = new url.URL(hostAndPaths.autoComplete);

    Object.keys(params).forEach(key => {
        urlObj.searchParams.set(key, params[key]);
    })

    axios.get(urlObj.toString())
        .then(response => {
            cb(null, response)

        })
        .catch(e => cb(e));

}






module.exports = { home, resources, getAutoComplete, getSuggestions }