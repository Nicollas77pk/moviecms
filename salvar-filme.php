<?php

header("Content-Type: application/json");


$dados = json_decode(file_get_contents("php://input"), true);



if(!$dados){

    echo json_encode([
        "status"=>"erro",
        "mensagem"=>"Nenhum dado recebido"
    ]);

    exit;

}



$arquivo = "database/filmes.json";



// verifica se existe o arquivo

if(file_exists($arquivo)){


    $filmes = json_decode(
        file_get_contents($arquivo),
        true
    );


}else{


    $filmes = [];

}



// adiciona novo filme

$filmes[] = $dados;



// salva

file_put_contents(
    $arquivo,
    json_encode(
        $filmes,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    )
);



echo json_encode([

    "status"=>"sucesso",

    "mensagem"=>"Filme salvo com sucesso"

]);


?>
