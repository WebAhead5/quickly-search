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
            getSearch({q: input.value, count:1}, (err,resp) => {
            data = resp;
            loadData(resp,contents)
        });
    });
                      
    var gify;

}
displayData();

function loadData(dataToLoad,container){


    dataToLoad.forEach(obj => {
        console.log(obj)

       let gify = document.createElement('div');
        gify.innerHTML= `<img src="${obj.original.url}">`;
        // gify.src =`${obj.original.url}`;
        // gify.alt = `${obj.title}`;
        // gify.width = `${obj.original.height}`;
        // gify.height = `${obj.original.width}`;
        gify.classList.add("contentElement")
        container.appendChild(gify);
    });
}