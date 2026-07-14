fetch('../database/filmes.json')
.then(r => r.json())
.then(filmes=>{

let html='';

filmes.forEach(f=>{

html+=`

<tr>

<td>${f.id}</td>

<td>${f.titulo}</td>

<td>${f.ano}</td>

<td>

<button>Editar</button>

</td>

</tr>

`;

});

document.getElementById('filmes').innerHTML=html;

});

document.getElementById("novoFilme").onclick=function(){

alert("Em breve teremos o cadastro de filmes!");

};
