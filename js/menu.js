const menuToggle =
document.getElementById("menuToggle");


const menu =
document.getElementById("menu");



if(menuToggle){


menuToggle.addEventListener("click",()=>{


    menu.classList.toggle("ativo");


});


}
