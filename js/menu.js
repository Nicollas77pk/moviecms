/* ==========================================
   MENU MOBILE
========================================== */

const menu = document.getElementById("menu");

const menuToggle = document.getElementById("menuToggle");


if(menu && menuToggle){

    menuToggle.addEventListener("click",()=>{

        menu.classList.toggle("ativo");

        menuToggle.innerHTML =

            menu.classList.contains("ativo")

            ? "✕"

            : "☰";

    });

}


/* ==========================================
   FECHA AO CLICAR NO LINK
========================================== */

document.querySelectorAll(".menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        menu.classList.remove("ativo");

        menuToggle.innerHTML="☰";

    });

});


/* ==========================================
   FECHA CLICANDO FORA
========================================== */

document.addEventListener("click",(e)=>{

    if(

        !menu.contains(e.target)

        &&

        !menuToggle.contains(e.target)

    ){

        menu.classList.remove("ativo");

        menuToggle.innerHTML="☰";

    }

});


/* ==========================================
   VOLTOU PARA DESKTOP
========================================== */

window.addEventListener("resize",()=>{

    if(window.innerWidth>768){

        menu.classList.remove("ativo");

        menuToggle.innerHTML="☰";

    }

});
