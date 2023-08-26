const pokemon_list = document.getElementById("pokemon_list");
const load_more_button = document.getElementById('load_more');
const max_records = 151
const limit = 10;
let offset = 0;
    
function load_pokemon_itens(offset, limit) {
    poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
        const new_html = pokemons.map((pokemon) => `
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
        `).join('')

        pokemon_list.innerHTML += new_html
    });
}

load_pokemon_itens(offset, limit)

load_more_button.addEventListener('click', () => {
    offset += limit
    const quantity_record_with_next_page = offset + limit

    if (quantity_record_with_next_page >= max_records) {
        
        const new_limit = max_records - offset
        load_pokemon_itens(offset, new_limit)

        load_more_button.parentElement.removeChild(load_more_button)
    } else {
        load_pokemon_itens(offset, limit)
    }
})





