
//--------------------------------------------------------------------------------------
const contents = document.getElementById('contentContainer');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const autoCompleteContainer = document.getElementById('autocompleteContainer');
const searchInputField = document.getElementById('searchInput');
const searchBarContainer = document.getElementById('searchBarContainer');
const searchAndSuggestionsContainer = document.getElementById('searchAndSuggestions');
const searchBtn = document.getElementById('searchButton');
let wallpaperDiv = document.getElementById("wallpaperImage");
//--------------------------------------------------------------------------------------

let selectedItemContainer = document.getElementById("selectedItemContainer");
let selectedItemBackground = document.getElementById("outsideSelectedItem");
let selectedItemImage = document.getElementById("selectedItem");
//--------------------------------------------------------------------------------------
const contentLoadingCount= 10;
const scrollingPercentage = .8; //at what percentage from the scroll bar to load the next images
let  timeoutID_fetchData, timeoutID_notScrollable;
let timeoutMS = 100;
let loadedImagesCount = 0;
let canLoadContent = true;
//--------------------------------------------------------------------------------------

initialize();

function initialize(){

    //load wallpaper
    logic.getWallpaper({type:"random"}, (error, result)=> {
        wallpaperDiv.style.background = `url(${result.url})`
    });

    //set content scroll behaviour
    contents.addEventListener("scroll", ()=> {

        append_notScrollable_and_OnScroll()
    });

    //set the search button click event
    searchBtn.addEventListener('click', () => {
        // loadData(searchInputField.value);
        timeoutID_fetchData =  logic.runOnceDelay(timeoutID_fetchData,timeoutMS,()=> loadData(searchInputField.value) );

    });

    //set the search bar text change behaviour
    searchInputField.addEventListener('input', () => {
        searchInputField.value = logic.filterInput(searchInputField.value);
        timeoutID_fetchData = logic.runOnceDelay(timeoutID_fetchData,timeoutMS,()=> loadData(searchInputField.value) );

    });

    //when an image is selected - press outside it to close it
    selectedItemBackground.onclick = ()=>{
        selectedItemContainer.classList.toggle("hidden",true)
    }

    //when an image is selected - press escape to close it
    document.addEventListener("keydown",e => {
        console.log(e.code)
           if( e.code === "Escape"  && !selectedItemBackground.classList.contains("hidden"))
           selectedItemContainer.classList.toggle("hidden",true)
    });



}


//--------------------------------------------------------------------------------------
function loadData(str) {


    //hide container if the search-bar input is empty
    contents.classList.toggle("hideContent", !str || str === "");

    //hide wallpaper if the search-bar input is empty
    wallpaperDiv.classList.toggle("wallpaperHidden", str && str !== "");

    //expand search-bar if the input is not empty
    searchBarContainer.classList.toggle("searchBarContainer_withInput", str && str !== "");
    searchAndSuggestionsContainer.classList.toggle("searchAndSuggestions_withInput", str && str !== "");

    //reset the elements count
    loadedImagesCount = 0;

    //load suggestions
    logic.getSuggestions({q: str}, (err, resp) => {
        loadSuggestionsToHTML(resp, suggestionsContainer)
    });

    //load auto-complete options
    logic.getAutocomplete({q: str}, (err, resp) => {
        loadAutocompleteToHTML(resp, autoCompleteContainer)
    });

    //load content
    logic.getSearch({q: str, count: contentLoadingCount}, (err, resp) => {
        loadContentToHtml(resp, contents);

    });



}
function loadContentToHtml(dataToLoad, container,isAppend = false){
   if(!isAppend)
       container.innerHTML="";

   //a json array
    dataToLoad.forEach(obj => {

       let gif = document.createElement('div');
        gif.innerHTML= `<img src="${obj["preview_gif"].url}">`;
        gif.classList.add("contentElement");
        gif.onclick = ()=>{

            //enlarge the selected image if pressed
            selectedItemContainer.classList.toggle("hidden",false);

            //set the enlatged image
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
    //load images if no scroll bar is showing
    canLoadContent = true;
    append_notScrollable_and_OnScroll();
}
function loadSuggestionsToHTML(dataToLoad, container) {
    container.innerHTML = "";

    //a json array
    dataToLoad.forEach(obj => {

        let bubble = document.createElement('span');
        bubble.textContent = obj;
        bubble.onclick = () => {
            //load the suggestion into the search bar
            searchInputField.value = obj;
            loadData(obj)

        };


        bubble.classList.add("suggestionBubble");
        container.appendChild(bubble);
    });
}
function loadAutocompleteToHTML(dataToLoad, container){
    container.innerHTML="";

    //a json array
    dataToLoad.forEach(obj => {
        let option = document.createElement('option');
        option.value= obj;

        container.appendChild(option);
    });
}
function append_notScrollable_and_OnScroll() {

    let searchFieldNotEmpty =  searchInputField.value;
    let notEnoughContentToScroll = !logic.isScrollable(contents) ;
    let scrollerPassedMarker = logic.isScrollerPast(contents, scrollingPercentage)

    if (canLoadContent && searchFieldNotEmpty)
        if (notEnoughContentToScroll || scrollerPassedMarker) {

            //a callback to load the data to the html
            let loadToHtml = function(err, jsonObj) {
                loadContentToHtml(jsonObj, contents, true);
            }

            //
            let fetchContentFromBackend = function (){

                //count the appended elements
                loadedImagesCount += contentLoadingCount;
                let startIndex = loadedImagesCount;

                //get the data from the backend and load it into the html
                logic.getSearch({q: searchInputField.value, count: contentLoadingCount, start: startIndex}
                    , loadToHtml)

            };

            //a way to avoid appending every frame
            timeoutID_notScrollable = logic.runOnceDelay(timeoutID_notScrollable, 20, fetchContentFromBackend);
            canLoadContent = false;
        }
}

//--------------------------------------------------------------------------------------
