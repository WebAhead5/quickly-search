function displayData(){
    var contents = document.getElementById('container');
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
            console.log(data);
        });
    });
                      
    var gify;   
    Array.from(data).forEach(obj => {
        gify = document.createElement('img');
        gify.src =`${obj.original.url}`;
        gify.alt = `${obj.title}`;
        gify.width = `${obj.original.height}`;
        gify.height = `${obj.original.width}`;
        contents.appendChild(gify);
    });
}
displayData();