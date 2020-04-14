function displayData(){
    
    var contents = document.getElementById('container');
    var searchInput= document.getElementById('search');
    var data;
    
    //on click search button
    SearchButton.addEventListener('click', () => {
        getSearch({q: searchInput.value}, (err,resp) => {
            data = resp; 
            console.log(data);
        });
    });
    
    //if mousedown is the return button
    searchInput.addEventListener('input', () => {
            getSearch({q: searchInput.value}, (err,resp) => {
            data = resp; 
            console.log(data);
        });
    });
                      
    
    var gify;   
    data.forEach(obj => {
        gify = document.createElement('img');
        gify.src =`${obj.original.url}`;
        gify.alt = `${obj.title}`;
        gify.width = `${obj.original.height}`;
        gify.height = `${obj.original.width}`;
        contents.appendChild(gify);
    });
}



//function displayData(){
//    var contents = document.getElementById('container');
//    var gify;   
//    fetchData()
//        .then ( data => { 
//            data.forEach(obj => {
//            gify = document.createElement('img');
//            gify.src =`${obj.original.url}`;
//            gify.alt = `${obj.title}`;
//            gify.width = `${obj.original.height}`;
//            gify.height = `${obj.original.width}`;
//            contents.appendChild(gify);
//            })
//    })
//        .catch( err => {
//            alert('display error results');
//    });
//}
//
//
//async function fetchData(){
//        var str= document.getElementById('search').value;
//        const response = await fetch('/search?q=' + encodeURI("search str"));
//        const data = await response.json();    
//}