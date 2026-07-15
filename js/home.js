document.addEventListener("DOMContentLoaded", iniciarHome);

async function iniciarHome(){

    carregarFilmes();

}

async function carregarFilmes(){

    const dados = await api("/movie/popular");

    renderizarCards(
        "carrossel-filmes",
        dados.results,
        "movie"
    );

}
