const modal = document.getElementById("modal");
const modalBanner = document.getElementById("modalBanner");
const modalTitulo = document.getElementById("modalTitulo");
const modalMeta = document.getElementById("modalMeta");
const modalDescricao = document.getElementById("modalDescricao");
const modalTrailer = document.getElementById("modalTrailer");
const modalProviders = document.getElementById("modalProviders");
const fecharModal = document.getElementById("fecharModal");


/* ===========================
   ABRIR MODAL
=========================== */

async function abrirModal(id, tipo = "movie") {


    console.log("ID:", id);
    console.log("TIPO:", tipo);


    if(!modal) return;


    modal.classList.add("ativo");

    document.body.style.overflow = "hidden";


    modalTitulo.innerHTML = "Carregando...";

    modalDescricao.innerHTML = "";

    modalMeta.innerHTML = "";

    modalProviders.innerHTML = "";


    if(modalTrailer){

        modalTrailer.innerHTML = "";

    }



    try {


        const detalhes = await api(`/${tipo}/${id}`);


        preencherModal(
            detalhes,
            tipo
        );


        await carregarTrailer(
            id,
            tipo
        );


        await carregarOndeAssistir(
            id,
            tipo
        );



    } catch(error){


        console.error(
            "Erro modal:",
            error
        );


        modalTitulo.innerHTML =
        "Erro ao carregar conteúdo";


    }


}





/* ===========================
   PREENCHER MODAL
=========================== */


function preencherModal(item,tipo){


    if(modalBanner){


        modalBanner.style.backgroundImage =

        item.backdrop_path

        ?

        `url(${CONFIG.IMAGE_BACKDROP}${item.backdrop_path})`

        :

        "none";


    }



    modalTitulo.innerHTML =

    item.title ||

    item.name ||

    "Sem título";




    const ano = (

        item.release_date ||

        item.first_air_date ||

        ""

    ).substring(0,4);




    const nota = item.vote_average

    ?

    item.vote_average.toFixed(1)

    :

    "-";





    const duracao = item.runtime

    ?

    item.runtime + " min"

    :

    "";





    const generos = item.genres

    ?

    item.genres

    .map(g=>g.name)

    .join(" • ")

    :

    "";





    modalMeta.innerHTML = `


        ⭐ ${nota}

        ${ano ? " | " + ano : ""}

        ${duracao ? " | " + duracao : ""}

        ${generos ? " | " + generos : ""}


    `;




    modalDescricao.innerHTML =

    item.overview ||

    "Sinopse não disponível.";



}





/* ===========================
   ONDE ASSISTIR
=========================== */


async function carregarOndeAssistir(id,tipo){


    try{


        const dados = await api(

            `/${tipo}/${id}/watch/providers`

        );



        modalProviders.innerHTML =

        "<h3>Onde assistir</h3>";




        if(

            !dados.results ||

            !dados.results.BR

        ){


            modalProviders.innerHTML +=

            `

            <p>

            Não encontramos plataformas disponíveis para o Brasil.

            </p>

            `;


            adicionarOferta();

            return;


        }




        const br = dados.results.BR;



        if(br.flatrate){



            const lista = document.createElement("div");


            lista.className = "providers";




            br.flatrate.forEach(provider=>{



                lista.innerHTML += `


                <a

                    class="provider"

                    href="${br.link || '#'}"

                    target="_blank"

                    rel="noopener">


                    <img

                    src="https://image.tmdb.org/t/p/w92${provider.logo_path}"

                    alt="${provider.provider_name}">


                    <span>

                    ${provider.provider_name}

                    </span>



                </a>


                `;



            });



            modalProviders.appendChild(lista);



        }



        adicionarOferta();




    }

    catch(error){


        console.error(

            "Erro providers:",

            error

        );


    }


}







/* ===========================
   OFERTA WHATSAPP
=========================== */


function adicionarOferta(){


modalProviders.innerHTML += `


<div class="streaming-oferta">


<h3>

💡 Quer vários streamings pagando o preço de um?

</h3>



<p>

Tenha acesso a diversas plataformas em um único plano.

</p>



<a

href="https://wa.me/5521994414427?text=Olá!%20Vi%20no%20MultiTela%20a%20opção%20de%20streamings%20e%20gostaria%20de%20saber%20mais."

target="_blank"

class="streaming-btn">


Saiba mais


</a>


</div>


`;

}





/* ===========================
   TRAILER
=========================== */


async function carregarTrailer(id,tipo){



try{


const dados = await api(

`/${tipo}/${id}/videos`

);




if(

!dados.results ||

dados.results.length === 0 ||

!modalTrailer

){

return;

}





const trailer = dados.results.find(video=>


video.site === "YouTube"

&&

video.type === "Trailer"


);




if(!trailer){

return;

}





modalTrailer.innerHTML = `


<h3>

🎬 Trailer

</h3>



<div class="trailer-box">


<iframe

src="https://www.youtube.com/embed/${trailer.key}"

title="Trailer"

frameborder="0"

allowfullscreen>


</iframe>



</div>


`;





}

catch(error){


console.error(

"Erro trailer:",

error

);


}



}





/* ===========================
   FECHAR MODAL
=========================== */


function fecharModalFuncao(){


if(!modal) return;



modal.classList.remove("ativo");


document.body.style.overflow = "";



}



if(fecharModal){


fecharModal.addEventListener(

"click",

(e)=>{


e.stopPropagation();


fecharModalFuncao();


}


);


}




if(modal){


modal.addEventListener(

"click",

(e)=>{


if(e.target === modal){


fecharModalFuncao();


}


}


);


}





document.addEventListener(

"keydown",

(e)=>{


if(e.key === "Escape"){


fecharModalFuncao();


}


}


);
