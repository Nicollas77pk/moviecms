function criarCard(item, tipo = "movie") {

    const titulo = item.title || item.name || "Sem título";

    const poster = item.poster_path
        ? `${CONFIG.IMAGE_POSTER}${item.poster_path}`
        : "https://via.placeholder.com/342x513?text=Sem+Imagem";


    const nota = item.vote_average
        ? item.vote_average.toFixed(1)
        : "0.0";


    return `

    <article 
        class="card"
        data-id="${item.id}"
        data-tipo="${tipo}"
        onclick="abrirModal(${item.id}, '${tipo}')"
    >


        <div class="card-image">


            <img 
                src="${poster}"
                alt="${titulo}"
                loading="lazy">


            <span class="nota">
                ⭐ ${nota}
            </span>


        </div>



        <div class="card-info">


            <h3>
                ${titulo}
            </h3>


            <span class="tipo">
                ${tipo === "movie" ? "Filme" : "Série"}
            </span>


        </div>


    </article>

    `;
}




function renderizarCards(containerId, lista, tipo = "movie") {


    const container = document.getElementById(containerId);


    if(!container) return;



    container.innerHTML = lista

        .filter(item => item.poster_path)

        .map(item => criarCard(item,tipo))

        .join("");

}
