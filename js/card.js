/* ===========================================
   CRIA UM CARD
=========================================== */

function criarCard(item, tipo = "movie") {

    const titulo =
        item.title ||
        item.name ||
        "Sem título";

    const poster = item.poster_path
        ? CONFIG.IMAGE_POSTER + item.poster_path
        : "https://via.placeholder.com/342x513?text=Sem+Imagem";

    const nota = item.vote_average
        ? item.vote_average.toFixed(1)
        : "0.0";

    const ano = (
        item.release_date ||
        item.first_air_date ||
        ""
    ).substring(0, 4);

    return `
    
        <div
            class="card"
            data-id="${item.id}"
            data-tipo="${tipo}">

            <img
                src="${poster}"
                alt="${titulo}"
                loading="lazy">

            <div class="card-overlay">

                <h3 class="card-title">

                    ${titulo}

                </h3>

                <div class="card-meta">

                    <span class="card-rating">

                        ⭐ ${nota}

                    </span>

                    <span>

                        ${ano}

                    </span>

                </div>

                <button class="card-btn">

                    Ver detalhes

                </button>

            </div>

        </div>

    `;

}


/* ===========================================
   RENDERIZA OS CARDS
=========================================== */

function renderizarCards(containerId, lista, tipo = "movie") {

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = "";

    lista.forEach(item => {

        if (!item.poster_path) return;

        html += criarCard(item, tipo);

    });

    // Adiciona os novos cards sem apagar os antigos
    container.insertAdjacentHTML("beforeend", html);

    // Ativa o clique dos novos cards
    container.querySelectorAll(".card").forEach(card => {

        if (card.dataset.evento) return;

        card.dataset.evento = "1";

        card.addEventListener("click", () => {

            abrirModal(
                card.dataset.id,
                card.dataset.tipo
            );

        });

    });

}


/* ===========================================
   EVENTOS DOS CARDS
=========================================== */

document.addEventListener("click", function (e) {

    const card = e.target.closest(".card");

    if (!card) return;

    const id = card.dataset.id;

    const tipo = card.dataset.tipo;

    if (typeof abrirModal === "function") {

        abrirModal(id, tipo);

    } else {

        console.log("Card clicado:", id, tipo);

    }

});
