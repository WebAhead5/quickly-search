
const url = require("url");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const hostAndPaths = {
    search: "https://api.giphy.com/v1/gifs/search",
    autoComplete: "https://api.giphy.com/v1/gifs/search/tags",
    suggestions: "https://api.giphy.com/v1/tags/related/",
    trending: "https://api.giphy.com/v1/gifs/trending",
    random: "https://api.giphy.com/v1/gifs/trending",
};

const api_key_giphy = process.env.API_GIPHY || "ZrUrI0GTfFYUKWIV78zDckNWUQ2DLfBo";



function home(request, response) {

    let mainPagePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(mainPagePath, (error, data) => {
        if (error) {
            badRequest(request, response);
            return;
        }

        response.writeHead(200, { "content-type": "text/html" });
        response.end(data)

    })

}
function resources(request, response) {
    const url = request.url;
    const exten = url.split('.')[1];
    const extenType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        ico: 'image/x-icon',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        svg: 'image/svg+xml'
    };
    const filepath = path.join(__dirname, '..', "public", url);
    fs.readFile(filepath, (error, file) => {
        if (error) {
            badRequest(request, response)
        } else {
            response.writeHead(200, { 'content-type': extenType[exten] });
            response.end(file);
        }
    })


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


/***
 *  if a get request for "/autocomplete" with a "q" param is made (example: "/autocomplete?q=someText" )
 *  return an array of auto-complete options (strings)
 * @param request
 * @param response
 */
function getAutoComplete(request, response) {
    let params = getParamsFromRequest(request);
    fetchTextFromGiphyRequest(request,response,hostAndPaths.autoComplete,{q: params.q})
}


/***
 *  if a get request for "/suggestions" with a "q" param is made (example: "/suggestions?q=someText" )
 *  return an array of suggestions - words related to the provided word (strings)
 * @param request
 * @param response
 */ 
function getSuggestions(request, response) {

    let params = getParamsFromRequest(request);
    fetchTextFromGiphyRequest(request,response,hostAndPaths.suggestions + params.q)

}


/***
 *  if a get request for "/search" with a "q" param is made (example: "/search?q=someText" ).
 *
 *  [optional] a "count" param can be provided as well - indication the number of image objects to return (default 25)
 *  (example: "/search?q=someText&count=5")
 *
 *  return an array of objects containing urls to the provided word (strings).
 * @param request
 * @param response
 */
function getSearch(request,response){

    let params = getParamsFromRequest(request);

    fetchImagesFromGiphyRequest(request,response,hostAndPaths.search,{q:params.q ,limit:params.count || 25} )

}

function getTrending(request,response){
    let params = getParamsFromRequest(request);
    fetchImagesFromGiphyRequest(request,response,hostAndPaths.trending,{q:params.q ,limit:params.count || 25} )

}




function getParamsFromRequest(request){
    let search = url.parse(request.url).query;

    return  querystring.parse(search);
}
function fetchImagesFromGiphyRequest(request,response,apiRequestLink,params = {} ) {

    fetchFromApi(apiRequestLink, {...params, api_key: api_key_giphy}, (error, res) => {
        if (error) {
            badRequest(request, response)
        } else {
            let resultArr = Array.from(res.data.data).map(element => {
                return {...element.images, id: element.id}
            });
            response.writeHead(200,{"content-type": "application/json"});
            response.end(JSON.stringify(resultArr))

        }
    })

}
function fetchTextFromGiphyRequest(request,response,apiRequestLink,params = {} ) {

    fetchFromApi(apiRequestLink ,{ ...params ,api_key: api_key_giphy }, (error, res) => {

        response.writeHead(200, {"content-type": "application/json"});

        if (error) response.end("[]");

        else {
            let resultArr = Array.from(res.data.data).map(x=>x.name);
            response.end(JSON.stringify(resultArr))
        }


    });
}
function fetchFromApi(apiUrl, params = {}, cb) {
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





module.exports = { home, notFound, resources, getAutoComplete, getSuggestions,getSearch , getTrending}

