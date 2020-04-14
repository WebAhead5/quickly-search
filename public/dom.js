function displayData(){
    var contents = document.getElementById('contentContainer');
    var input = document.getElementById('searchInput');
    var searchBtn = document.getElementById('searchButton');
    
    var data;
    
    //on click search button
    searchBtn.addEventListener('click', () => {
        getSearch({q: input.value}, (err,resp) => {
            data = resp; 
            console.log(data);
        });
    });
    
    //if mousedown is the return button
    input.addEventListener('input', () => {
            getSearch({q: input.value}, (err,resp) => {
            data = resp;
            contents.innerHTML="";
            loadData(resp,contents)
        });
    });
                      

}
displayData();

function loadData(dataToLoad,container){


    dataToLoad.forEach(obj => {
        console.log(obj)

       let gify = document.createElement('div');
        gify.innerHTML= `<img src="${obj.original.url}">`;
        gify.classList.add("contentElement")
        container.appendChild(gify);
    });
}