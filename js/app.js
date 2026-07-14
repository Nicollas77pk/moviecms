fetch('../database/filmes.json')
.then(r=>r.json())
.then(filmes=>{

document.getElementById("totalFilmes").innerHTML=filmes.length;

let html='';

filmes.forEach(f=>{

html+=`
<tr>

<td>${f.id}</td>

<td>${f.titulo}</td>

<td>${f.ano}</td>

</tr>
`;

});

document.getElementById("filmes").innerHTML=html;

});
