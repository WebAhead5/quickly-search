
const url = require("url");
const axios = require("axios");
const path = require("path");
const fs = require("fs") ;
const hostAndPaths = {
    search:"http://api.giphy.com/v1/gifs/search",
    autoComplete:"http://api.giphy.com/v1/gifs/search/tags",
    suggestions:"api.giphy.com/v1/tags/related/"
};



function home(request,response){

    let mainPagePath= path.join(__dirname,"..","public","index.html");
    fs.readFile(mainPagePath, (error,data)=>{
        if(error)
        {
            badRequestHandler(request,response);
            return;
        }

        response.writeHead(200,{"content-type":"text/html"})
        response.end(data)

    })


}



function resources(request,response){

}


function getAutoComplete(request,response){


    // call fetchSuggestionsFromApi()
}

function fetchAutoCompleteFromApi(searchStr){
    let urlObj = new url.URL(hostAndPaths.autoComplete);
    urlObj.searchParams.set("api_key","ZrUrI0GTfFYUKWIV78zDckNWUQ2DLfBo");
    urlObj.searchParams.set("q",searchStr);


    axios.get(urlObj.toString())
        .then(response=> {
            let suggestionsArr = Array.from(response.data.data).map(sug=> sug.name);
            console.log(suggestionsArr);
            return suggestionsArr;
        })
        .catch(e=> console.log(e));

}


function notFoundHandler(request,response){

}

function badRequestHandler(request,response){
//error 400
}



fetchAutoCompleteFromApi("cat");


module.exports = {home,resources,getAutoComplete}