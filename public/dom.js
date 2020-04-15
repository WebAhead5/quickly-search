
//--------------------------------------------------------------------------------------
const contents = document.getElementById('contentContainer');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const autoCompleteContainer = document.getElementById('autocompleteContainer');
const searchInputField = document.getElementById('searchInput');
const searchBarContainer = document.getElementById('searchBarContainer');
const searchBtn = document.getElementById('searchButton');
let wallpaperDiv = document.getElementById("wallpaperImage");
//--------------------------------------------------------------------------------------

let selectedItemContainer = document.getElementById("selectedItemContainer");
let selectedItemBackground = document.getElementById("outsideSelectedItem");
let selectedItemImage = document.getElementById("selectedItem");
//--------------------------------------------------------------------------------------
const contentLoadingCount= 20;
const scrollingPercentage = 0.5; //at what percentage from the scroll bar to load the next images
let timeoutID_scroll, timeoutID_fetchData, timeoutID_notScrollable;
let timeoutMS = 300;
let loadedImagesCount = 0;
//--------------------------------------------------------------------------------------

initialize();




function initialize(){

    //load wallpaper
    logic.getWallpaper({type:"random"}, (error, result)=> {
        wallpaperDiv.style.background = `url(${result.url})`
    });


    //set content scroll behaviour
    contents.addEventListener("scroll", ()=> {

        let loadToHtml = (err, dataToLoad) => loadContentToHtml(dataToLoad, contents, true);

        let fetchContent = ()=> {
            loadedImagesCount += contentLoadingCount;
            let  startingIndex = loadedImagesCount;
            logic.getSearch({q: searchInputField.value, count: contentLoadingCount, start: startingIndex }, loadToHtml )
        };

        logic.onScrollerAt(contents, scrollingPercentage, () => {
            timeoutID_scroll = logic.runOnceDelay( timeoutID_scroll,timeoutMS,fetchContent);
        });

    });

    //set the search button click event
    searchBtn.addEventListener('click', () => {
        // loadData(searchInputField.value);
        timeoutID_fetchData =  logic.runOnceDelay(timeoutID_fetchData,timeoutMS,()=> loadData(searchInputField.value) );

    });

    //set the search bar text change behaviour
    searchInputField.addEventListener('input', () => {
        timeoutID_fetchData = logic.runOnceDelay(timeoutID_fetchData,timeoutMS,()=> loadData(searchInputField.value) );

    });



    //when an image is selected - press outside it to close it
    selectedItemBackground.onclick = ()=>{
        selectedItemContainer.classList.toggle("hidden",true)
    }

}


//--------------------------------------------------------------------------------------
function loadData(str) {


    //hide container if the search-bar input is empty
    contents.classList.toggle("hideContent", !str || str === "");

    //hide wallpaper if the search-bar input is empty
    wallpaperDiv.classList.toggle("wallpaperHidden", str && str !== "");

    //expand search-bar if the input is not empty
    searchBarContainer.classList.toggle("searchBarContainer_withInput", str && str !== "");

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
    loadContentIfNotScrollable();
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
function loadContentIfNotScrollable() {


    if (!logic.isScrollable(contents) && searchInputField.value ) {

        let loadToHtml = (err, resp) => loadContentToHtml(resp, contents, true);

        let fetchContent = () => {
            loadedImagesCount += contentLoadingCount;
            let startIndex = loadedImagesCount;
            logic.getSearch({
                q: searchInputField.value,
                count: contentLoadingCount,
                start: startIndex
            }, loadToHtml)
        };

        timeoutID_notScrollable = logic.runOnceDelay(timeoutID_notScrollable, 30, fetchContent);
    }
}


//--------------------------------------------------------------------------------------
