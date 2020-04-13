
const url = require("url");
const path = require("path");
const handlers = require("./handlers");


function router (request,response) {
    let pathname = url.parse(request.url).pathname;


    if(pathname === "/")
        handlers.home(request,response);


    else if(pathname.split(".").length === 2)
        handlers.resources(request,response);

    if(request.method === "GET"){
        if(pathname === "/autocomplete")
            handlers.getAutoComplete(request,response);
        else if(pathname === "/suggestions")
            handlers.getSuggestions(request,response);
        else if(pathname === "/search")
            handlers.getSearch(request,response);
    }






}
module.exports = router;