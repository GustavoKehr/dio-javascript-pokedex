// Definição do objeto poke_api como um namespace vazio
const poke_api = {};

// Função para obter detalhes de um pokémon a partir da API
poke_api.get_pokemons_detail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) // Obtém os detalhes do pokémon da resposta da API
        .then(convert_pokeApi_detail_to_pokemon); // Converte os detalhes em um objeto Pokemon usando a função de conversão
}

// Função para obter uma lista de pokémons da API
poke_api.get_pokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json()) // Obtém os resultados da lista de pokémons da resposta da API
        .then((jsonBody) => jsonBody.results) // Extrai a lista de pokémons do corpo JSON
        .then((pokemons) => pokemons.map(poke_api.get_pokemons_detail)) // Mapeia cada pokémon para obter seus detalhes
        .then((detail_requests) => Promise.all(detail_requests)) // Faz todas as requisições de detalhes em paralelo
        .then((pokemons_details) => pokemons_details); // Retorna a lista completa de detalhes de pokémons
};

// Função para converter detalhes da API em um objeto Pokemon
function convert_pokeApi_detail_to_pokemon(poke_details) {
    const pokemon = new Pokemon(); // Presumindo que você tenha uma classe Pokemon definida em outro lugar

    pokemon.number = poke_details.id;
    pokemon.name = poke_details.name;

    // Mapeia os tipos do pokémon a partir dos detalhes da API
    const types = poke_details.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; // Assume o primeiro tipo como o tipo principal do pokémon

    pokemon.types = types; // Array de tipos do pokémon
    pokemon.type = type;   // Tipo principal do pokémon

    // Obtém a URL da imagem do pokémon
    pokemon.photo = poke_details.sprites.other.home.front_default;

    //Mapeia os stats do pokemon a partir dos detalhes da API
    const stats = poke_details.stats.map((statsPokemon) => statsPokemon.base_stat);
    const stat_name = poke_details.stats.map((statName) => statName.stat.name)

    pokemon.stats = stats //Base Stat de cada pokemon | 
    pokemon.stat_name = stat_name; //Nome do stat 
    console.log(stat_name)                        

    return pokemon;
}