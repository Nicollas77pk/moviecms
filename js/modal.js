/* ===========================
   BIBLIOTECA DE LINKS
=========================== */

const LINK_PROVIDERS = {

    "Netflix": "https://www.netflix.com/search?q=",

    "Amazon Prime Video": "https://www.primevideo.com/search/ref=atv_nb_sr?phrase=",

    "Prime Video": "https://www.primevideo.com/search/ref=atv_nb_sr?phrase=",

    "Disney+": "https://www.disneyplus.com/pt-br/search?q=",

    "Disney Plus": "https://www.disneyplus.com/pt-br/search?q=",

    "Max": "https://play.max.com/search?q=",

    "HBO Max": "https://play.max.com/search?q=",

    "Globoplay": "https://globoplay.globo.com/busca/?q=",

    "Paramount+": "https://www.paramountplus.com/search/?q=",

    "Paramount Plus": "https://www.paramountplus.com/search/?q=",

    "Apple TV+": "https://tv.apple.com/search?q=",

    "Apple TV Plus": "https://tv.apple.com/search?q=",

    "Crunchyroll": "https://www.crunchyroll.com/search?q=",

    "Looke": "https://www.looke.com.br/search?q=",

    "MUBI": "https://mubi.com/pt/search?query=",

    "Telecine": "https://www.telecine.com.br/busca?q=",

    "Claro tv+": "https://www.claro.com.br/claro-tv-plus",

    "Claro Video": "https://www.clarovideo.com/",

    "Pluto TV": "https://pluto.tv/",

    "Mercado Play": "https://www.mercadoplay.com.br/",

    "Plex": "https://watch.plex.tv/search?q=",

    "YouTube": "https://www.youtube.com/results?search_query=",

    "Google Play Movies": "https://play.google.com/store/search?q=",

    "Google Play": "https://play.google.com/store/search?q="

};


/* ===========================
   ONDE ASSISTIR
=========================== */

async function carregarOndeAssistir(id, tipo) {

    const detalhes = await api(`/${tipo}/${id}`);

    const titulo = detalhes.title || detalhes.name;

    const busca = encodeURIComponent(titulo);

    const dados = await api(`/${tipo}/${id}/watch/providers`);

    modalProviders.innerHTML = "<h3>Onde assistir</h3>";

    if (!dados.results || !dados.results.BR) {

        modalProviders.innerHTML +=
            "<p>Não encontramos plataformas disponíveis para o Brasil.</p>";

        return;

    }

    const br = dados.results.BR;

    let providers = [];

    if (br.flatrate) providers.push(...br.flatrate);

    if (br.buy) providers.push(...br.buy);

    if (br.rent) providers.push(...br.rent);

    /* Remove repetidos */

    providers = providers.filter((provider, index, self) =>

        index === self.findIndex(p => p.provider_id === provider.provider_id)

    );

    const lista = document.createElement("div");

    lista.className = "providers";

    providers.forEach(provider => {

        const nome = provider.provider_name;

        const link = LINK_PROVIDERS[nome]

            ? LINK_PROVIDERS[nome] + busca

            : br.link;

        lista.innerHTML += `

            <a
                class="provider"
                href="${link}"
                target="_blank"
                rel="noopener">

                <img
                    src="https://image.tmdb.org/t/p/w92${provider.logo_path}"
                    alt="${nome}">

                <span>

                    ${nome}

                </span>

            </a>

        `;

    });

    modalProviders.appendChild(lista);

    /* Oferta */

    modalProviders.innerHTML += `

<div class="streaming-oferta">

    <h3>

        💡 Quer vários streamings pagando o preço de um?

    </h3>

    <p>

        Tenha acesso a diversas plataformas em um único plano.

    </p>

    <a

        href="https://wa.me/5521994414427?text=Olá!%20Vi%20no%20MultiTela%20e%20gostaria%20de%20saber%20mais."

        target="_blank"

        class="streaming-btn">

        Saiba mais

    </a>

</div>

`;

}
