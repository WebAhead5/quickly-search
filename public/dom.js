

var contents = document.getElementById('contentContainer');
var suggestionsContainer = document.getElementById('suggestionsContainer');
var autoCompleteContainer = document.getElementById('autocompleteContainer');
var searchInputField = document.getElementById('searchInput');
var searchBarContainer = document.getElementById('searchBarContainer');
var searchBtn = document.getElementById('searchButton');


//on click search button
searchBtn.addEventListener('click', () => {
    loadData(searchInputField.value);
});
//if mousedown is the return button
searchInputField.addEventListener('input', () => {
    let str =searchInputField.value;
    setTimeout(loadData(str), 500)

});

searchInputField.addEventListener('change', () => {


});



function loadData(str){
    //hide container if empty
    contents.classList.toggle("hidden",!str || str ==="")
    searchBarContainer.classList.toggle("searchBarWithInput",str && str !=="")


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