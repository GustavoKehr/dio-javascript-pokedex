// Obtém referências aos elementos da página HTML
const body_page = document.getElementsByClassName('content')
const pokemon_list = document.getElementById("pokemon_list");
const load_more_button = document.getElementById('load_more');

// Define algumas constantes e variáveis para controle
const max_records = 151; // Número máximo de registros de pokémon
const limit = 3; // Número de pokémons para carregar a cada vez
let offset = 0; // Deslocamento para acompanhar qual grupo de pokémons está sendo exibido

// Função para carregar itens de pokémon com um determinado deslocamento e limite
function load_pokemon_itens(offset, limit) {
    poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
        // Cria HTML para cada pokémon retornado pela API
        const new_html = pokemons.map((pokemon) => `
        <a href="pokemon_stats.html">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                        ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
            </li>
        </a>
        `).join('')

        // Adiciona o HTML criado à lista de pokémons
        pokemon_list.innerHTML += new_html
        
    });
}

// Carrega os primeiros pokémons quando a página é carregada
load_pokemon_itens(offset, limit);


// Adiciona um ouvinte de evento para o botão "Carregar Mais"
load_more_button.addEventListener('click', () => {
    offset += limit; // Atualiza o deslocamento para carregar mais pokémons
    const quantity_record_with_next_page = offset + limit;
    
    if (quantity_record_with_next_page >= max_records) {
        // Se estivermos prestes a exceder o número máximo de registros, ajustamos o limite
        const new_limit = max_records - offset;
        load_pokemon_itens(offset, new_limit);
        
        // Remove o botão "Carregar Mais" quando todos os pokémons foram carregados
        load_more_button.parentElement.removeChild(load_more_button);
    } else {
        // Caso contrário, continua carregando pokémons normalmente
        load_pokemon_itens(offset, limit);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    pokemon_list.addEventListener('click', (event) => {
        const clickedPokemon = event.target.closest('.pokemon');

        if (clickedPokemon) {
            const clickedId = clickedPokemon.id;
            redirectToPokemonDetailsPage(clickedId);
            console.log(clickedId)
        }
    });
});

function redirectToPokemonDetailsPage(pokemon) {
    // Aqui você define o URL da página de detalhes do pokémon
    // Certifique-se de personalizar o URL de acordo com sua estrutura de pastas
    const detailsPageUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.number}`;

    // Redirecionar para a página de detalhes do pokémon
    window.location.href = detailsPageUrl;
}
