document.addEventListener("DOMContentLoaded", iniciarHome);

async function iniciarHome(){

    await carregarBanner();

    await carregarFilmes();

}

async function carregarBanner(){

    const dados = await api("/trending/all/day");

    const destaque = dados.results[0];

    if(!destaque) return;

    document.getElementById("hero").style.backgroundImage =
        `url(${CONFIG.IMAGE_BACKDROP}${destaque.backdrop_path})`;

    document.getElementById("hero-title").textContent =
        destaque.title || destaque.name;

    document.getElementById("hero-description").textContent =
        destaque.overview;

}
