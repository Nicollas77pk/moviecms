console.log("TMDB JS CARREGADO");

async function buscarFilme() {

    const nomeFilme = document.getElementById("nomeFilme").value.trim();

    if (nomeFilme === "") {
        alert("Digite o nome de um filme.");
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(nomeFilme)}`;

    try {

        const resposta = await fetch(url);
        const dados = await resposta.json();

        console.log(dados);

        if (!dados.results || dados.results.length === 0) {

            document.getElementById("resultadoBusca").innerHTML =
                "<p>Nenhum filme encontrado.</p>";

            return;
        }

        let html = "";

        dados.results.slice(0, 5).forEach(filme => {

            const poster = filme.poster_path
                ? `https://image.tmdb.org/t/p/w300${filme.poster_path}`
                : "";

            const ano = filme.release_date
                ? filme.release_date.substring(0, 4)
                : "-";

            html += `
                <div class="resultado-filme">

                    <img src="${poster}" width="150">

                    <div>

                        <h3>${filme.title}</h3>

                        <p><strong>Ano:</strong> ${ano}</p>

                        <p>${filme.overview}</p>

                        <button onclick="selecionarFilme(${filme.id})">
                            Selecionar
                        </button>

                    </div>

                </div>
            `;

        });

        document.getElementById("resultadoBusca").innerHTML = html;

    } catch (erro) {

        console.error(erro);
        alert("Erro ao buscar filmes.");

    }

}

async function selecionarFilme(id) {

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`;

    try {

        const resposta = await fetch(url);

        const filme = await resposta.json();

        console.log(filme);

        document.getElementById("titulo").value = filme.title || "";

        document.getElementById("ano").value =
            filme.release_date
                ? filme.release_date.substring(0, 4)
                : "";

        document.getElementById("sinopse").value =
            filme.overview || "";

        document.getElementById("imagem").value =
            filme.poster_path
                ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
                : "";

        document.getElementById("genero").value =
            filme.genres
                .map(g => g.name)
                .join(", ");

        alert("Filme importado com sucesso!");

    } catch (erro) {

        console.error(erro);
        alert("Erro ao importar filme.");

    }

}

function salvarFilme() {

    const filme = {

        titulo: document.getElementById("titulo").value,
        ano: document.getElementById("ano").value,
        genero: document.getElementById("genero").value,
        diretor: document.getElementById("diretor").value,
        sinopse: document.getElementById("sinopse").value,
        imagem: document.getElementById("imagem").value

    };

    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    filmes.push(filme);

    localStorage.setItem("filmes", JSON.stringify(filmes));

    console.log(filmes);

    alert("Filme salvo com sucesso!");

}
