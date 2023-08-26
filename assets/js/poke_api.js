const poke_api = {}

function convert_pokeApi_detail_to_pokemon(poke_details) {
    const pokemon = new Pokemon()
    pokemon.number = poke_details.id
    pokemon.name = poke_details.name
    
    const types = poke_details.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types =  types
    pokemon.type = type

    pokemon.photo = poke_details.sprites.other.dream_world.front_default

    return pokemon
}

poke_api.get_pokemons_detail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) 
        .then(convert_pokeApi_detail_to_pokemon)
}

poke_api.get_pokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(poke_api.get_pokemons_detail))
        .then((detail_requests) => Promise.all(detail_requests))
        .then((pokemons_details) => pokemons_details)

};