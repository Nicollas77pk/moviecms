/* ==========================================================
   MULTITELA SEARCH v2.0
   Busca Global + Autocomplete + Infinite Scroll
========================================================== */

/* ==========================================================
   ESTADO DA BUSCA
========================================================== */

const Search = {

    cache: {},

    timeout: null,

    pagina: 1,

    carregando: false,

    termo: "",

    resultados: [],

    categoria: "",

    autocomplete: null,

    campo: null,

    botao: null,

    containerResultados: null

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Search.campo = document.getElementById("campoBusca");

    Search.botao = document.getElementById("btnBusca");

    Search.containerResultados =
        document.getElementById("resultadoBusca");

    criarAutocomplete();

    iniciarEventosBusca();

    verificarPaginaBusca();

});

/* ==========================================================
   EVENTOS
========================================================== */

function iniciarEventosBusca(){

    if(Search.botao){

        Search.botao.addEventListener("click", pesquisar);

    }

    if(Search.campo){

        Search.campo.addEventListener("keydown", eventoTeclado);

        Search.campo.addEventListener("input", eventoDigitacao);

    }

    document.addEventListener("click", clicarForaAutocomplete);

}

/* ==========================================================
   TECLADO
========================================================== */

function eventoTeclado(e){

    if(e.key === "Enter"){

        e.preventDefault();

        pesquisar();

    }

    if(e.key === "Escape"){

        fecharAutocomplete();

    }

}

/* ==========================================================
   DIGITAÇÃO
========================================================== */

function eventoDigitacao(){

    clearTimeout(Search.timeout);

    const texto = Search.campo.value.trim();

    if(texto.length < 2){

        fecharAutocomplete();

        return;

    }

    Search.timeout = setTimeout(()=>{

        pesquisarAutocomplete(texto);

    },300);

}


/* ==========================================================
   CRIA O AUTOCOMPLETE
========================================================== */

function criarAutocomplete(){

    if(document.getElementById("autocompleteBusca")){

        Search.autocomplete =
            document.getElementById("autocompleteBusca");

        return;

    }

    Search.autocomplete = document.createElement("div");

    Search.autocomplete.id = "autocompleteBusca";

    Search.autocomplete.className = "autocomplete";

    const header = document.querySelector(".header-right");

    if(header){

        header.style.position = "relative";

        header.appendChild(Search.autocomplete);

    }

}

/* ==========================================================
   FECHAR AUTOCOMPLETE
========================================================== */

function fecharAutocomplete(){

    if(Search.autocomplete){

        Search.autocomplete.innerHTML = "";

        Search.autocomplete.style.display = "none";

    }

}

/* ==========================================================
   CLIQUE FORA
========================================================== */

function clicarForaAutocomplete(e){

    if(!Search.autocomplete) return;

    if(

        !Search.autocomplete.contains(e.target) &&

        e.target !== Search.campo

    ){

        fecharAutocomplete();

    }

}

/* ==========================================================
   PESQUISA AUTOCOMPLETE
========================================================== */

async function pesquisarAutocomplete(texto){

    if(Search.cache[texto]){

        mostrarAutocomplete(

            Search.cache[texto]

        );

        return;

    }

    try{

        const dados = await api(

            `/search/multi?query=${encodeURIComponent(texto)}&page=1`

        );

        const resultados = dados.results.filter(item =>

            item.poster_path &&

            (item.media_type === "movie" ||

             item.media_type === "tv")

        ).slice(0,6);

        Search.cache[texto] = resultados;

        mostrarAutocomplete(resultados);

    }

    catch(error){

        console.error(error);

    }

}

