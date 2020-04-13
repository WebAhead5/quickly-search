
const url = require("url");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring")
const hostAndPaths = {
    search: "https://api.giphy.com/v1/gifs/search/",
    autoComplete: "https://api.giphy.com/v1/gifs/search/tags",
    suggestions: "https://api.giphy.com/v1/tags/related/"
};

const key = "ZrUrI0GTfFYUKWIV78zDckNWUQ2DLfBo";



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
    notFound(request, response);
}
function notFound(request, response) {
    //error 404
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>not found</h1>");
}
function badRequest(request, response) {
    //error 400
    response.writeHead(400, { "content-type": "text/html" });
    response.end("<h1>bad request</h1>");
}


function getAutoComplete(request, response) {

    let search = url.parse(request.url).query;
    let params = querystring.parse(search);
    fetchFromApi( hostAndPaths.autoComplete   ,{ q: params.q, api_key: key },   (error, res) => {
        if (error) {
            badRequest(request, response)
        }
        else {
            let suggestionsArr = Array.from(res.data.data).map(sug => sug.name);
            response.writeHead(200, {"content-type": "application/json"});
            console.log(suggestionsArr);
            response.end(suggestionsArr)
            // response.end(res.data)
        }
    })


    // call fetchSuggestionsFromApi()
}
function getSuggestions(request, response) {
    let search = url.parse(request.url).query;
    let params = querystring.parse(search);
    fetchFromApi(hostAndPaths.suggestions,{ term: params.q, api_key: key }, (error, res) => {
        if (error) {
            badRequest(request, response)
        }
        else {
            let suggestionsArr = Array.from(res.data.data).map(sug => sug.name);
            console.log(suggestionsArr);
            response.writeHead(200, {"content-type": "application/json"});
            response.end(suggestionsArr)
            // response.end(res.data)
        }
    })

}



function fetchFromApi(apiUrl,params = {}, cb) {
    let urlObj = new url.URL(apiUrl);

    Object.keys(params).forEach(key => {
        urlObj.searchParams.set(key, params[key]);
    });

    axios.get(urlObj.toString())
        .then(response => {
            cb(null, response)

        })
        .catch(e => cb(e));

}






module.exports = { home, resources, getAutoComplete, getSuggestions }