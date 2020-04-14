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

function fetchfromAPI (params, path, cb) {
    let queryParams = Object.keys(params).map((p)=> `${p}=${encodeURI(params[p].toString())}`)
    queryParams = queryParams.join('&')
    fetch(`${path}?=${(queryParams)}`)
        .then(res => res.json())
        .then(jsonObj => cb(null, Array.from(jsonObj)))
        .catch(e=> cb(e))
}

// export {getAutocomplete, getSuggestions, getSearch, getTrending}