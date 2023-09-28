const URL = "https://api.thecatapi.com/v1/images/search";
const API_Key = "live_aD81OlUwOrxOFyT4Pjjtcjmxe4pgty3jxEcZeoAQFoYp7ijqFGr8pMOyBc9ba0qR";

let amount = 20;
let imgArray = [];

/** 
 * Llamada al API
 * @param {string} URL - Url get de la cual tomar la informacion
 * @param {number} amount - Cantidad de imagenes que se quiere traer
 * Esta llamada funciona pasando una api key
*/
async function call(amount){
    const res = await fetch(`${URL}?limit=${amount}&api_key=${API_Key}`);
    const data = await res.json();

    imgArray = [];
    let auxArray = [];

    for(let i = 0; i< data.length; i++){
        auxArray.push(data[i].url);
        auxArray.push(data[i].id);
        imgArray.push(auxArray);
        auxArray = [];
    }

    imgArray.forEach(element => {
        let divElement = document.createElement("div");
        let divInputFavorite = document.createElement("div");
        divElement.className = "imgContainer";
        divInputFavorite.className = "favorites-cats";

        let img = document.createElement("img");
        let container = document.getElementById("container");

        divElement.appendChild(img).setAttribute("src",element[0]);
        divElement.appendChild(divInputFavorite);
        divInputFavorite.setAttribute("data-favorites", false);
        divInputFavorite.setAttribute("id", element[1]);
        divInputFavorite.setAttribute("onclick", "favoriteCats(this)");
        divInputFavorite.innerHTML = `<i class="fa-solid fa-heart"></i>`;

        container.appendChild(divElement);
    })
}

call(amount);

function reCall(){
    let container = document.getElementById("container");
    let removeElements = document.querySelectorAll("div.imgContainer");
    removeElements.forEach(element => {
        container.removeChild(element);
    })
    call(amount);
}

function favoriteCats(e){
    let idImgCat = e.getAttribute("id");

    let clickElement = document.getElementById(idImgCat);
    let auxIconSelector = clickElement.childNodes[0];

    if(clickElement.getAttribute("data-favorites") === "false"){
        clickElement.setAttribute("data-favorites", "true");
        clickElement.className = "favorites-cats active-favorites-cats";
        auxIconSelector.className = "fa-solid fa-heart active-favorites-cats-icon";
    }else{
        clickElement.setAttribute("data-favorites", "false");
        clickElement.className = "favorites-cats";
        auxIconSelector.className = "fa-solid fa-heart";
    }
    
}

function changePage(e){
    
    let pageActive = e.getAttribute("data-active-section");

    if(pageActive === "false"){
        let sectionOn = document.getElementsByClassName("on-section");
        let sectionOff = document.getElementsByClassName("off-section");

        let sectionTurnOff = document.getElementById(sectionOn[0].id)
        let sectionTurnOn = document.getElementById(sectionOff[0].id)

        sectionTurnOff.className = "off-section";
        sectionTurnOn.className = "on-section";

        let changePageInd1 = document.getElementById("cats-section");
        let changePageInd2 = document.getElementById("favorites-cats-section");

        changePageInd1.setAttribute("data-active-section",`${changePageInd1.getAttribute("data-active-section") === "false"}`)
        changePageInd2.setAttribute("data-active-section",`${changePageInd2.getAttribute("data-active-section") === "false"}`)

    }
}
