
const url = require("url");
const handlers = require("./handlers");


function router (request,response) {
    let pathname = url.parse(request.url).pathname;
    console.log("pathname is: ",pathname);

    if(pathname === "/")
        handlers.home(request,response);


    else if(pathname.split(".").length === 2)
    
        handlers.resources(request,response);

    else if(request.method === "GET"){
        if(pathname === "/autocomplete")
            handlers.getAutoComplete(request,response);
        else if(pathname === "/suggestions")
            handlers.getSuggestions(request,response);
        else if(pathname === "/search")
            handlers.getSearch(request,response);
        else if(pathname === "/trending")
            handlers.getTrending(request,response);

    }

    else handlers.notFound(request, response);





}
module.exports = router;