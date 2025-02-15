/**
 * Takes the pokemon object from API and extracts only the needed values
 * 
 * @description 
 * Following are the attributes and the way to access them for a pokemon in the current API:
 * - image: pokemon.sprites.other.dream_world.front_default
 * - name: pokemon.name
 * - experience: pokemon.base_experience
 * - abilities: pokemon.abilities[index].ability.name
 */
export class Pokemon
{
    constructor(pokemon) 
    {
        this.img = pokemon['sprites']['other']['dream_world']['front_default']
        this.name = pokemon['name']
        this.experience = pokemon['base_experience']
        this.abilities = pokemon['abilities'].map(obj => obj['ability']['name'])
    }
}