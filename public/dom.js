

var contents = document.getElementById('contentContainer');
var suggestionsContainer = document.getElementById('suggestionsContainer');
var autoCompleteContainer = document.getElementById('autocompleteContainer');
var searchInputField = document.getElementById('searchInput');
var searchBarContainer = document.getElementById('searchBarContainer');
var searchBtn = document.getElementById('searchButton');
let wallpaperDiv = document.getElementById("wallpaperImage");


//on click search button
searchBtn.addEventListener('click', () => {
    loadData(searchInputField.value);
});
//if mousedown is the return button
searchInputField.addEventListener('input', () => {
    loadData(searchInputField.value);

});

searchInputField.addEventListener('change', () => {


});



getWallpaper({type:"random"}, (error, result)=> {
    wallpaperDiv.style.background = `url(${result.url})`
});


function loadData(str){
    //hide container if empty
    contents.classList.toggle("hidden",!str || str ==="")
    searchBarContainer.classList.toggle("searchBarWithInput",str && str !=="")
    wallpaperDiv.classList.toggle("wallpaperHidden",str && str !=="");


    getSearch({q: str}, (err,resp) => {
        contents.innerHTML="";
        loadContentIntoHtml(resp,contents)
    });

    getSuggestions({q: str}, (err,resp) => {
        suggestionsContainer.innerHTML="";
        loadSuggestionsIntoHtml(resp,suggestionsContainer)
    });

    getAutocomplete({q:str},(err,resp)=> {
        autoCompleteContainer.innerHTML="";
        loadAutocompleteIntoHtml(resp,autoCompleteContainer)
    });



}


function loadContentIntoHtml(dataToLoad, container){

    dataToLoad.forEach(obj => {

       let gify = document.createElement('div');
        gify.innerHTML= `<img src="${obj["preview_gif"].url}">`;
        gify.classList.add("contentElement")
        container.appendChild(gify);
    });
}
function loadSuggestionsIntoHtml(dataToLoad, container){
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
function loadAutocompleteIntoHtml(dataToLoad, container){
    dataToLoad.forEach(obj => {

        let option = document.createElement('option');
        option.value= obj;

        container.appendChild(option);
    });
}