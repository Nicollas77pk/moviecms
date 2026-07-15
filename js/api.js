async function api(endpoint){

    const url =
        `${CONFIG.API_URL}${endpoint}` +
        `${endpoint.includes("?") ? "&" : "?"}` +
        `api_key=${CONFIG.API_KEY}` +
        `&language=${CONFIG.LANGUAGE}`;

    const resposta = await fetch(url);

    return await resposta.json();

}
