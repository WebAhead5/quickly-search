

const logic = {

    getAutocomplete:
        function (params, cb) {
            logic.fetchJsonFromBackend(params, '/autocomplete', cb)
        },
    getSuggestions:
        function (params, cb) {
            logic.fetchJsonFromBackend(params, '/suggestions', cb)
        },
    getSearch:
        function (params, cb) {
            logic.fetchJsonFromBackend(params, '/search', cb)
        },
    getTrending:
        function (params, cb) {
            logic.fetchJsonFromBackend(params, '/trending', cb)
        },
    getWallpaper:
        function (params, cb) {
            logic.fetchJsonFromBackend(params, '/wallpaper', cb)
        },
    fetchJsonFromBackend:
        /***
         * makes a get request to the provided url with params, and calls the callback on result/error.
         * @param {object} params the params to add to the url-path
         * @param {string} localURL - the local path-url for the get request
         * @param {function(error:object, jsonResult: object)} cb - a callback function
         */
        function (params, localURL, cb) {
            let queryParams = Object.keys(params).map((p) => `${p}=${encodeURI(params[p].toString())}`);
            queryParams = queryParams.join('&');
            let urlWithParams = `${localURL}${Object.keys(params).length === 0 ? "" : "?"}${(queryParams)}`;
            fetch(urlWithParams)
                .then(res => res.json())
                .then(jsonObj => cb(null, jsonObj))
                .catch(e => cb(e))
        },


    onScrollerAt:
        /***
         * calls the callback the the user passes a certain percentage of it.
         * @param {HTMLElement} scrollingDiv - the div with a scroll bar
         * @param {number} posPercentage - a number between 0 and 1
         * @param {function()} cb
         */
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
        /***
         * wraps a callback function with a setTimeout, and clears the timeout with the provided ID object (timeoutID).
         * @param {object} timeoutID - a timeoutObject to clear/cancel
         * @param {number} timeoutMS - the delay of the timeout in milliseconds
         * @param {function()}cb - the callback function to call after the delay is over
         * @return {Object} an object of type timeoutObject
         */
        function (timeoutID, timeoutMS, cb) {

            clearTimeout(timeoutID);
            return setTimeout(cb, timeoutMS)
        },
    isScrollable:
        /***
         * returns true of the div can scroll (holds overflowing items).
         * @param div the html element to check
         * @return {boolean}
         */
        function (div) {
            let height = div.clientHeight;
            let scrollableAreaSize = div.scrollHeight;
            return height < scrollableAreaSize;

        }

};