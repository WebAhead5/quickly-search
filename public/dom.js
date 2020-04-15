

var contents = document.getElementById('contentContainer');
var suggestionsContainer = document.getElementById('suggestionsContainer');
var autoCompleteContainer = document.getElementById('autocompleteContainer');
var searchInputField = document.getElementById('searchInput');
var searchBarContainer = document.getElementById('searchBarContainer');
var searchBtn = document.getElementById('searchButton');
let wallpaperDiv = document.getElementById("wallpaperImage");
const contentLoadingCount= 60;
const scrollingPercentage = 0.66;


initialize();




function initialize(){

    //load wallpaper
    getWallpaper({type:"random"}, (error, result)=> {
        wallpaperDiv.style.background = `url(${result.url})`
    });


    //set content scroll behaviour
    contents.addEventListener("scroll", ()=> {

        onScrollerAt(contents, scrollingPercentage, () => {
            console.log( "loading")
                getSearch({
                        q: searchInputField.value,
                        count: contentLoadingCount,
                        start: searchInputField.childElementCount },

                    (err, resp) => { loadContentToHtml(resp, contents, true);});
        });
    });

    searchBtn.addEventListener('click', () => {
        loadData(searchInputField.value);
    });

    searchInputField.addEventListener('input', () => {
        loadData(searchInputField.value);

    });

    searchInputField.addEventListener('change', () => {


    });


}

function loadData(str){

    //hide container if the search-bar input is empty
    contents.classList.toggle("hidden",!str || str ==="")

    //hide wallpaper if the search-bar input is empty
    wallpaperDiv.classList.toggle("wallpaperHidden",str && str !=="");

    //expand search-bar if the input is not empty
    searchBarContainer.classList.toggle("searchBarContainer_withInput",str && str !=="")



    getSearch({q: str, count:contentLoadingCount}, (err,resp) => {
        loadContentToHtml(resp,contents);

    });

    getSuggestions({q: str}, (err,resp) => {
        loadSuggestionsToHTML(resp,suggestionsContainer)
    });

    getAutocomplete({q:str},(err,resp)=> {
        loadAutocompleteToHTML(resp,autoCompleteContainer)
    });



}
function loadContentToHtml(dataToLoad, container,isAppend){
   if(!isAppend)
        container.innerHTML="";
    dataToLoad.forEach(obj => {

       let gify = document.createElement('div');
        gify.innerHTML= `<img src="${obj["preview_gif"].url}">`;
        gify.classList.add("contentElement");

        container.appendChild(gify);
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

function onScrollerAt(scrollingDiv, posPercentage, cb) {

        // document bottom
    let height = scrollingDiv.clientHeight;
    let viewHeight= scrollingDiv.scrollHeight;
    let scrollTop = scrollingDiv.scrollTop ;
    if((height + scrollTop ) > viewHeight*.66 ){
        cb()
    }

}
