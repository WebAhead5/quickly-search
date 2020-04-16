const dotenv = require('dotenv')
const url = require("url");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
require("dotenv").config()

const hostAndPaths = {
    search: "https://api.giphy.com/v1/gifs/search",
    autoComplete: "https://api.giphy.com/v1/gifs/search/tags",
    suggestions: "https://api.giphy.com/v1/tags/related/",
    trending: "https://api.giphy.com/v1/gifs/trending",
    random: "https://api.giphy.com/v1/gifs/trending",
    wallpaper: "https://bing.biturl.top/?resolution=1920&format=json"
};
const api_key_giphy =  process.env.API_GIPHY ;



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
    const requestURL = request.url;
    const ext = requestURL.split('.')[1];
    const extType = {
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
    const filepath = path.join(__dirname, '..', "public", requestURL);
    fs.readFile(filepath, (error, file) => {
        if (error) {
            badRequest(request, response)
        } else {
            response.writeHead(200, { 'content-type': extType[ext] });
            response.end(file);
        }
    })
}
function notFound(request, response) {
    //error 404
    fs.readFile(path.join(__dirname, '..', 'public', 'notFound.html'), (error, file) => {
        response.writeHead(404, { 'content-type' : 'text/html'})
        response.end(file)
      })
    
}
function badRequest(request, response) {
    //error 400
    
    response.writeHead(400, { "content-type": "text/html" });
    response.end("<h1>bad request</h1>");
}


 /***
 *  if a get request for "/autocomplete"  is made (example: "/autocomplete?q=someText" )
 *  return an array of auto-complete options (strings).
 * @param request
 * @param response
 */
function getAutoComplete(request, response) {
    let params = getParamsFromRequest(request);
    fetchTextFromGiphyRequest(request,response,hostAndPaths.autoComplete,{q: params.q},true)
}

/***
 *  if a get request for "/suggestions"  is made (example: "/suggestions?q=someText" )
 *  return an array of suggestions (strings).
 * @param request
 * @param response
 */
function getSuggestions(request, response) {

    let params = getParamsFromRequest(request);
    fetchTextFromGiphyRequest(request,response,hostAndPaths.suggestions + params.q)

}

/***
 *  if a get request for "/search"  is made (example: "/search?q=someText&count=5" )
 *  return an array objects containing an info about the images
 * @param request
 * @param response
 */
function getSearch(request,response){

    let params = getParamsFromRequest(request);

    fetchImagesFromGiphyRequest(request,response,hostAndPaths.search,{q:params.q ,limit:params.count || 25, offset: params.start} )

}

/***
 *  if a get request for "/trending"  is made (example: "/trending?q=someText" )
 *  return an array objects containing an info about the images.
 * @param request
 * @param response
 */
function getTrending(request,response){
    let params = getParamsFromRequest(request);
    fetchImagesFromGiphyRequest(request,response,hostAndPaths.trending,{q:params.q ,limit:params.count || 25} )

}

/***
 *  if a get request for "/wallpaper"  is made (example: "/wallpaper?type=random" )
 *  return an array objects containing an info about the images.
 * @param request
 * @param response
 */
function getWallpaper(request, response) {
    let params = getParamsFromRequest(request);
    let imagesIndex = 1;
    if(params.type === 'random'){
        imagesIndex = Math.floor(Math.random() * 8)
    }
    fetchFromApi(hostAndPaths.wallpaper, {index: imagesIndex}, (error, result)=> {
        if (error) {
            badRequest(request, response)
        } else {
            response.writeHead(200, {'content-type': 'application/json'});
            response.end(JSON.stringify(result.data))
        }
    })
}




/***
 * returns an object of the query params  that are in the request.url.
 * @param request
 */
function getParamsFromRequest(request){
    let search = url.parse(request.url).query;

    return  querystring.parse(search);
}

/***
 * handles the retrieval of the trending and search result images from giphy's api.
 * @param request
 * @param response
 * @param apiRequestURL - Giphy api url
 * @param params - the params to add to the url other than the API_KEY
 */
function fetchImagesFromGiphyRequest(request,response,apiRequestURL,params = {} ) {

    fetchFromApi(apiRequestURL, {...params, api_key: api_key_giphy}, (error, res) => {
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


/***
 * handles the retrieval of the suggestions and auto-complete options from giphy's api.
 * @param request
 * @param response
 * @param apiRequestURL - Giphy api url
 * @param params - the params to add to the url other than the API_KEY
 * @param addSearchToResult - if true adds the search query to the results
 */
function fetchTextFromGiphyRequest(request,response,apiRequestURL,params = {},addSearchToResult = false ) {

    fetchFromApi(apiRequestURL ,{ ...params ,api_key: api_key_giphy }, (error, res) => {

        response.writeHead(200, {"content-type": "application/json"});

        if (error) response.end("[]");

        else {
            let resultArr = Array.from(res.data.data).map(x=>x.name);
            if(addSearchToResult)
                resultArr.unshift(params.q);
            response.end(JSON.stringify(resultArr))
        }


    });
}

/***
 * adds the parameters to the api url, and make a get request to that url calls the callback function on response or on error.
 *
 * @param {string} apiUrl -  an api url
 * @param {object} params - the parameters to add to the url
 * @param {function(error:object , result:object )} cb - a callback function
 */
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




module.exports = { home, notFound, resources, getAutoComplete, getSuggestions,getSearch , getTrending, getWallpaper};

