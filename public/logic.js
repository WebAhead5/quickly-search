function getAutocomplete (params, cb) {
    fetchFromAPI(params, '/autocomplete', cb)
}

function getSuggestions (params, cb) {
    fetchFromAPI(params, '/suggestions', cb)
}

function getSearch (params, cb) {
    fetchFromAPI(params, '/search', cb)
}

function getTrending (params, cb) {
    fetchFromAPI(params, '/tranding', cb)
}

function getWallpaper (params, cb) {
    fetchFromAPI(params, '/wallpaper', cb)
}

function fetchFromAPI (params, path, cb) {
    let queryParams = Object.keys(params).map((p)=> `${p}=${encodeURI(params[p].toString())}`)
    queryParams = queryParams.join('&')
    let urlWithParams = `${path}${Object.keys(params).length ==0? "": "?"}${(queryParams)}`
    fetch(urlWithParams)
        .then(res => res.json())
        .then(jsonObj => cb(null, jsonObj))
        .catch(e=> cb(e))
}

// export {getAutocomplete, getSuggestions, getSearch, getTrending}