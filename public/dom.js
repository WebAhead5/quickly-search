

async function displayData(){
    try{
        const response = await fetch('/router');
        const data = await response.json(); 

        var contents = document.getElementById('container');
        var gify;
        data.forEach(obj => {
            gify = document.createElement('img');
            // gify location: obj.data[0].images.original.url
            gify.src =`${obj.images.original.url}`;
            gify.alt = `${obj.title}`;
            gify.width = "250";
            gify.height = "250";
            contents.appendChild(gify);
        });
    } catch(err) {
        alert(err);
    } 
}