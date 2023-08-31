
// Obtém referências aos elementos da página HTML
const pokemon_detail = document.getElementById("pokemon_detail_stat");
const load_more_button = document.getElementById('load_more');

// Define algumas constantes e variáveis para controle
const max_records = 151; // Número máximo de registros de pokémon
const limit = 1; // Número de pokémons para carregar a cada vez
let offset = 0; // Deslocamento para acompanhar qual grupo de pokémons está sendo exibido

// Função para carregar itens de pokémon com um determinado deslocamento e limite
function load_pokemon_itens() {
    poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
        // Cria HTML para cada pokémon retornado pela API
        const new_html = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span> 
                <span class="name">${pokemon.name}</span> 
                <ol class="types">
                ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </li>
            <li class="pokemon_stat">
            <span class="hp">HP: ${pokemon.stats[0]}</span>
            <span class="attack">Attack: ${pokemon.stats[1]}</span>
            <span class="defence">Defence: ${pokemon.stats[2]}</span>
            <span class="special_attack">Special Attack: ${pokemon.stats[3]}</span>
            <span class="special_defence">Special Defence: ${pokemon.stats[4]}</span>
            <span class="speed">Speed: ${pokemon.stats[5]}</span>
            </li>
        `).join('')

        // Adiciona o HTML criado à lista de pokémons
        pokemon_detail.innerHTML += new_html
        
    });
}

// Carrega os primeiros pokémons quando a página é carregada
load_pokemon_itens(offset, limit);

 