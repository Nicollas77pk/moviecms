document.addEventListener("DOMContentLoaded", carregarDashboard);

function carregarDashboard() {

    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    // Atualiza o card Total de Filmes
    document.getElementById("totalFilmes").textContent = filmes.length;

    // Corpo da tabela
    let tbody = document.getElementById("filmes");

    tbody.innerHTML = "";

    filmes.forEach((filme, index) => {

        tbody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${filme.titulo}</td>

            <td>${filme.ano}</td>

            <td>

                <button onclick="editarFilme(${index})">
                    Editar
                </button>

                <button onclick="excluirFilme(${index})">
                    Excluir
                </button>

            </td>

        </tr>

        `;

    });

}

function excluirFilme(index) {

    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    if (!confirm("Deseja excluir este filme?")) {
        return;
    }

    filmes.splice(index, 1);

    localStorage.setItem("filmes", JSON.stringify(filmes));

    carregarDashboard();

}

function editarFilme(index) {

    alert("A edição será criada na próxima aula.");

}
