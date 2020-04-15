

const logic = {

    getAutocomplete:
        function (params, cb) {
            logic.fetchFromAPI(params, '/autocomplete', cb)
        },
    getSuggestions:
        function (params, cb) {
            logic.fetchFromAPI(params, '/suggestions', cb)
        },
    getSearch:
        function (params, cb) {
            logic.fetchFromAPI(params, '/search', cb)
        },
    getTrending:
        function (params, cb) {
            logic.fetchFromAPI(params, '/trending', cb)
        },
    getWallpaper:
        function (params, cb) {
            logic.fetchFromAPI(params, '/wallpaper', cb)
        },
    fetchFromAPI:
        function (params, path, cb) {
            let queryParams = Object.keys(params).map((p) => `${p}=${encodeURI(params[p].toString())}`);
            queryParams = queryParams.join('&');
            let urlWithParams = `${path}${Object.keys(params).length === 0 ? "" : "?"}${(queryParams)}`;
            fetch(urlWithParams)
                .then(res => res.json())
                .then(jsonObj => cb(null, jsonObj))
                .catch(e => cb(e))
        },


    onScrollerAt:
        function (scrollingDiv, posPercentage, cb) {

            // document bottom
            let height = scrollingDiv.clientHeight;
            let scrollableAreaSize = scrollingDiv.scrollHeight;
            let scrollTop = scrollingDiv.scrollTop;

            if ((height + scrollTop) >= scrollableAreaSize * posPercentage) {
                cb()
            }

        },
    runOnceDelay:
        function (timeoutID, timeoutMS, cb) {

            clearTimeout(timeoutID);
            return setTimeout(cb, timeoutMS)
        },
    isScrollable:
        function (div) {
            let height = div.clientHeight;
            let scrollableAreaSize = div.scrollHeight;
            return height < scrollableAreaSize;

        }

};