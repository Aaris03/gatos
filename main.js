const URL = "https://api.thecatapi.com/v1/images/search";
const API_Key = "live_aD81OlUwOrxOFyT4Pjjtcjmxe4pgty3jxEcZeoAQFoYp7ijqFGr8pMOyBc9ba0qR"

let src;

/** 
 * Llamada al API - Multiples imagenes
 * @param {string} URL - Url get de la cual tomar la informacion
 * @param {number} amount - Cantidad de imagenes de gatos que desea desplegar 
 * Esta llamada funciona sin api key, recibiendo un array de 10 items los cuales se filtran dependiendo de cuantos se deseen;
 * La llamada se hace con promesas
*/
/*function severalImg(amount){
    fetch(`${URL}?limit=${amount}&api_key=${API_Key}`)
    .then(res => res.json())
    .then(data => {

        let urlPhoto = [];
        let idItem = [];
        let showPhotos = [];
        let showPhotosFilter = [];
        let removeUrl;

        for(i = 0; i< data.length; i++){
            urlPhoto.push(data[i].url)
            idItem.push(data[i].id)
        }
        console.log(idItem)

        while(showPhotos.length < amount){
            removeUrl = Math.floor(Math.random()*urlPhoto.length)
            showPhotos.push(urlPhoto[removeUrl]) ;
            urlPhoto.slice(removeUrl)
        }
        
        showPhotosFilter = showPhotos.filter((item,index)=>{
            return showPhotos.indexOf(item) === index;
        })

        showPhotosFilter.forEach(element => {
            let divElement = document.createElement("div")
            let divInputFavorite = document.createElement("div")
            divElement.className = "imgContainer"
            divInputFavorite.className = "favorites-cats"
            /*let divInputFavorite = `<div class="favorites-cats">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>`

            let img = document.createElement("img")
            let container = document.getElementById("container")

            divElement.appendChild(img).setAttribute("src",element)
            divElement.appendChild(divInputFavorite);
            divInputFavorite.innerHTML = `<i class="fa-solid fa-heart"></i>`
            divInputFavorite.setAttribute("onmouseover", "iconChange()")
            container.appendChild(divElement)
        })
    })
}*/

let amount = 20;

/** 
 * Llamada al API - Una imagen
 * @param {string} URL - Url get de la cual tomar la informacion
 * Esta llamada funciona sin api key, recibiendo un unico valor
 * La llamada se hace con asincronismo
*/

async function call(amount){
    const res = await fetch(`${URL}?limit=${amount}&api_key=${API_Key}`);
    const data = await res.json();

    let imgArray = [];
    let auxArray = [];

    for(let i = 0; i< data.length; i++){
        auxArray.push(data[i].url)
        auxArray.push(data[i].id)
        imgArray.push(auxArray)
        auxArray = []
    }

    imgArray.forEach(element => {
        let divElement = document.createElement("div")
        let divInputFavorite = document.createElement("div")
        divElement.className = "imgContainer"
        divInputFavorite.className = "favorites-cats"

        let img = document.createElement("img")
        let container = document.getElementById("container");

        divElement.appendChild(img).setAttribute("src",element[0]);
        divElement.appendChild(divInputFavorite);
        divInputFavorite.innerHTML = `<i class="fa-solid fa-heart"></i>`;

        container.appendChild(divElement)
    })
}

call(amount);

function reCall(){
    let container = document.getElementById("container")
    let removeElements = document.querySelectorAll("div.imgContainer")
    //console.log(removeElements)
    removeElements.forEach(element => {
        container.removeChild(element)
    })
    //severalImg(100);
    call(amount);
}
