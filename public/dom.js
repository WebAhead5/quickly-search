

var contents = document.getElementById('contentContainer');
var suggestionsContainer = document.getElementById('suggestionsContainer');
var autoCompleteContainer = document.getElementById('autocompleteContainer');
var searchInputField = document.getElementById('searchInput');
var searchBarContainer = document.getElementById('searchBarContainer');
var searchBtn = document.getElementById('searchButton');
let wallpaperDiv = document.getElementById("wallpaperImage");

let selectedItemContainer = document.getElementById("selectedItemContainer");
let selectedItemBackground = document.getElementById("outsideSelectedItem");
let selectedItemImage = document.getElementById("selectedItem");

const contentLoadingCount= 30;
const scrollingPercentage = 0.5;
let timeoutID_scroll, timeoutID_fetchData, timeoutID_notScrollable;
let timeoutMS = 300;
let loadedImagesCount = 0;

initialize();




function initialize(){

    //load wallpaper
    getWallpaper({type:"random"}, (error, result)=> {
        wallpaperDiv.style.background = `url(${result.url})`
    });


    //set content scroll behaviour
    contents.addEventListener("scroll", ()=> {

        let loadToHtml = (err, dataToLoad) => loadContentToHtml(dataToLoad, contents, true);

        let fetchContent = ()=> {
            loadedImagesCount += contentLoadingCount;
            let  startingIndex = loadedImagesCount;
            getSearch({q: searchInputField.value, count: contentLoadingCount, start: startingIndex }, loadToHtml )
        };

        onScrollerAt(contents, scrollingPercentage, () => {
            timeoutID_scroll = runOnceDelay( timeoutID_scroll,timeoutMS,fetchContent);
        });

    });

    searchBtn.addEventListener('click', () => {
        // loadData(searchInputField.value);
        timeoutID_fetchData =  runOnceDelay(timeoutID_fetchData,timeoutMS,()=> loadData(searchInputField.value) );

    });

    searchInputField.addEventListener('input', () => {
        timeoutID_fetchData = runOnceDelay(timeoutID_fetchData,timeoutMS,()=> loadData(searchInputField.value) );

    });

    loadContentIfNotScrollable()


    selectedItemBackground.onclick = ()=>{
        selectedItemContainer.classList.toggle("hidden",true)
    }

}



function loadData(str) {


    //hide container if the search-bar input is empty
    contents.classList.toggle("hideContent", !str || str === "")

    //hide wallpaper if the search-bar input is empty
    wallpaperDiv.classList.toggle("wallpaperHidden", str && str !== "");

    //expand search-bar if the input is not empty
    searchBarContainer.classList.toggle("searchBarContainer_withInput", str && str !== "")


    loadedImagesCount = 0;


    getSearch({q: str, count: contentLoadingCount}, (err, resp) => {
        loadContentToHtml(resp, contents);

    });

    getSuggestions({q: str}, (err, resp) => {
        loadSuggestionsToHTML(resp, suggestionsContainer)
    });

    getAutocomplete({q: str}, (err, resp) => {
        loadAutocompleteToHTML(resp, autoCompleteContainer)
    });


}
function loadContentToHtml(dataToLoad, container,isAppend = false){
   if(!isAppend)
       container.innerHTML="";

    dataToLoad.forEach(obj => {

       let gif = document.createElement('div');
        gif.innerHTML= `<img src="${obj["preview_gif"].url}">`;
        gif.classList.add("contentElement");
        gif.onclick = ()=>{
            selectedItemContainer.classList.toggle("hidden",false);
            selectedItemImage.style.background= `url(${obj["original"].url})`;

            //set the enlatged image size
            let width = obj["original"].width;
            let height = obj["original"].height;
            let max = Math.max(width ,  height);
            let min = Math.min(width ,  height);
            let calc = "min(80vh,80vw)";
            selectedItemImage.style.width = calc;
            selectedItemImage.style.height = `calc(${(min / max)} * ${calc})`;



        };

        container.appendChild(gif);
    });

}
function loadSuggestionsToHTML(dataToLoad, container){
    container.innerHTML="";

    if(dataToLoad && dataToLoad.length !== 0)
        dataToLoad.forEach(obj => {

            let bubble = document.createElement('span');
            bubble.textContent= obj;
            bubble.onclick = ()=>{
                searchInputField.value= obj;
                loadData(obj)

            };

            bubble.classList.add("suggestionBubble");
            container.appendChild(bubble);
        });
}
function loadAutocompleteToHTML(dataToLoad, container){
    container.innerHTML="";

    dataToLoad.forEach(obj => {

        let option = document.createElement('option');
        option.value= obj;

        container.appendChild(option);
    });
}

function loadContentIfNotScrollable(){
    setInterval(()=> {

        if(!isScrollable(contents)) {

            let loadToHtml = (err, resp) => loadContentToHtml(resp, contents, true);

            let fetchContent = () => {
                loadedImagesCount += contentLoadingCount;
               let  startingIndex = loadedImagesCount;

                getSearch({
                    q: searchInputField.value,
                    count: contentLoadingCount,
                    start: startingIndex
                }, loadToHtml)
            };

            timeoutID_notScrollable = runOnceDelay(timeoutID_notScrollable, 0, fetchContent);
        }

    } , 300)

}


function onScrollerAt(scrollingDiv, posPercentage, cb) {

        // document bottom
    let height = scrollingDiv.clientHeight;
    let scrollableAreaSize= scrollingDiv.scrollHeight;
    let scrollTop = scrollingDiv.scrollTop ;

    if((height + scrollTop ) >= scrollableAreaSize*posPercentage ){
        cb()
    }

}
function runOnceDelay(timeoutID, timeoutMS, cb) {

    clearTimeout(timeoutID);
    return  setTimeout(cb, timeoutMS)
}
function isScrollable(div) {
    let height = div.clientHeight;
    let scrollableAreaSize= div.scrollHeight;

    return height < scrollableAreaSize;


}
