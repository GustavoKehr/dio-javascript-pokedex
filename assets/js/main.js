// Obtém referências aos elementos da página HTML
const body_page = document.getElementsByClassName('content')
const pokemon_list = document.getElementById("pokemon_list");
const load_more_button = document.getElementById('load_more');

// Define algumas constantes e variáveis para controle
const max_records = 151; // Número máximo de registros de pokémon
const limit = 10; // Número de pokémons para carregar a cada vez
let offset = 0; // Deslocamento para acompanhar qual grupo de pokémons está sendo exibido


// Função para carregar itens de pokémon com um determinado deslocamento e limite
function load_pokemon_itens(offset, limit) {
    poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
        // Cria HTML para cada pokémon retornado pela API
        const new_html = pokemons.map((pokemon) => `

            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                    <div class="detail" onclick="togglePokemonDetails(this)">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                    </div>

            <div class="pokemon-detalhe" style="display: none;" onclick="togglePokemonMargin(this)">
            <ol id="pokemon_detail_stat" class="pokemon_detail">
                <li class="pokemon_stat ${pokemon.type}" ">
                    <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon_img">
                    <h3 class="pokemon_title">Base Stats ${pokemon.name}</h3>
                    <span class="hp">HP: ${pokemon.stats[0]}</span>
                    <span class="attack">Attack: ${pokemon.stats[1]}</span>
                    <span class="defence">Defence: ${pokemon.stats[2]}</span>
                    <span class="special_attack">Special Attack: ${pokemon.stats[3]}</span>
                    <span class="special_defence">Special Defence: ${pokemon.stats[4]}</span>
                    <span class="speed">Speed: ${pokemon.stats[5]}</span>
                    </div>
                </li>

            </ol>
                `).join('')

                // Adiciona o HTML criado à lista de pokémons
                pokemon_list.innerHTML += new_html

            });
        }

const pokemon = poke_api.get_pokemons(offset, limit).then(pokemons = [])

        function togglePokemonDetails(pokemonHeader) {
            const pokemonDetail = pokemonHeader.nextElementSibling;
            const pokemonItem = pokemonHeader.closest('.pokemon');
            // const pokemonList = document.getElementsByClassName(`pokemon ${pokemon.type}`)

            if (pokemonDetail.style.display === 'none') {
                pokemonDetail.style.display = 'block';
                // pokemonList.style.marginBottom = '24rem'

            } else {
                pokemonDetail.style.display = 'none';
                
            }
            if (pokemonItem) {
                if (pokemonItem.style.marginBottom === '') {
                    pokemonItem.style.marginBottom = '24rem'; // Adicione a margem quando o pokémon for clicado
                } else {
                    pokemonItem.style.marginBottom = ''; // Remova a margem quando clicar novamente
                }
            }
        }
            
        

        
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


















































