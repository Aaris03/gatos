const URL_All_Cats = "https://api.thecatapi.com/v1/images/search";
const URL_Favorites_Cats = "https://api.thecatapi.com/v1/favourites";
const API_Key = "live_aD81OlUwOrxOFyT4Pjjtcjmxe4pgty3jxEcZeoAQFoYp7ijqFGr8pMOyBc9ba0qR";

let amount = 30;
let imgArray = [];
let imgArrayAll = [];

/** 
 * Llamada al API
 * @param {string} URL - Url get de la cual tomar la informacion
 * @param {number} amount - Cantidad de imagenes que se quiere traer
 * Esta llamada funciona pasando una api key
*/
async function call(amount){
    const res = await fetch(`${URL_All_Cats}?limit=${amount}&api_key=${API_Key}`);
    const data = await res.json();

    imgArray = [];
    let auxArray = [];

    for(let i = 0; i< data.length; i++){
        auxArray.push(data[i].url);
        auxArray.push(data[i].id);
        imgArray.push(auxArray);
        imgArrayAll.push(auxArray);
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

    await callFavoritesCats();
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
function removeFavorites(){
    let container = document.getElementById("container-favorites");
    let removeElements = document.querySelectorAll("div.imgContainerFav");
    removeElements.forEach(element => {
        container.removeChild(element);
    })
}

async function favoriteCats(e){
    let idImgCat = e.id;

    let clickElement = document.getElementById(idImgCat);
    let auxIconSelector = clickElement.childNodes[0];

    if(clickElement.getAttribute("data-favorites") === "false"){
        clickElement.setAttribute("data-favorites", "true");
        clickElement.className = "favorites-cats active-favorites-cats";
        auxIconSelector.className = "fa-solid fa-heart active-favorites-cats-icon";
        await addFavoritesCats(idImgCat);
        
        const res = await fetch(`${URL_Favorites_Cats}`,{
            headers:{
                "Content-Type":"application/json",
                "x-api-key": `${API_Key}`
            }
        });

        const data = await res.json();
        console.log(data)
        console.log(imgArrayAll)

        await data.forEach(element => {
            imgArrayAll.some(item => {
                if(item[1] == element.image_id){  
                    item.push(element.id)
                    clickElement.setAttribute("data-delete-id", item[2]);
                }
            }) 
        })      
    }else{
        clickElement.setAttribute("data-favorites", "false");
        clickElement.className = "favorites-cats";
        auxIconSelector.className = "fa-solid fa-heart";
        console.log(e)
        deleteFavoritesCats(this, false,e.getAttribute("data-delete-id"))
    }
    
}

function changePage(e){

    let pageActive = e.getAttribute("data-active-section");
    let actualPage = e.id;

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

        if(actualPage === "favorites-cats-section"){
            removeFavorites();
            callFavoritesCats();
        }

    }
}

async function callFavoritesCats(){
    const res = await fetch(`${URL_Favorites_Cats}`,{
        headers:{
            "Content-Type":"application/json",
            "x-api-key": `${API_Key}`
        }
    });
    const data = await res.json();

    data.forEach(element => {
        
        let divElement = document.createElement("div");
        let divInputDelete = document.createElement("div");
        divElement.className = "imgContainerFav";
        divInputDelete.className = "delete-Cat";

        let img = document.createElement("img");
        let container = document.getElementById("container-favorites");

        divElement.appendChild(img).setAttribute("src",element.image.url);
        divElement.appendChild(divInputDelete);
        divInputDelete.setAttribute("id", element.id);
        divInputDelete.setAttribute("onclick", "deleteFavoritesCats(this,true)");
        divInputDelete.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

        container.appendChild(divElement);
    })
}

async function addFavoritesCats(idCat){
    const newFavorite = await fetch(`${URL_Favorites_Cats}`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "x-api-key": `${API_Key}`
        },  
        body: JSON.stringify({
            "image_id":`${idCat}`
        })
    });


}

async function deleteFavoritesCats(e, condition, idDelFav){
    
    let idElement;
    
    if(condition){
        let removeElement = e.parentNode;
        idElement = e.id;
        removeElement.remove();
    }else{
        idElement = idDelFav;
    }

    const deleteFavorite = await fetch(`${URL_Favorites_Cats}/${idElement}`,{
        method: "DELETE",
        headers:{
            "Content-Type":"application/json",
            "x-api-key": `${API_Key}`
        }
    });  
}
