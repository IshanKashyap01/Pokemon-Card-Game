import * as Util from '../util.js'
import { Pokemon } from './Pokemon.js'
/**
 * link to the Pokemon API
 */
const API = 'https://pokeapi.co/api/v2/pokemon/'
/**
 * Fetches the Pokemons from the API
 */
export class PokemonLoader
{
    /**
     * Array containing objects with a Pokémon's API URL and a promise that resolves to a `Pokemon` object.
     * 
     * @type {Array<{name: string, url: string, promise: Promise<Pokemon> }>}
     */
    #pokemons
    constructor()
    {
        this.#pokemons = []
    }
    /**
     * Loads all pokemons from a resource into the `pokemons` global variable
     * @param {String} url URL of the resource
     */
    async loadPokemons()
    {
        try
        {
            const data = await Util.getJSONFromServer(API)
            const results = data['results']
            this.#pokemons = results.map((result) => {
                return {
                    name: result['name'],
                    url: result['url'], 
                    promise: this.loadPokemon(result['name'], result['url'])
                }
            })
            return this.#pokemons
        }
        catch(error)
        {
            Util.logError(error)
        }
    }
    /**
     * Loads a pokemon from the API
     * @param {String} url URL of the pokemon's API
     * @returns `Promise` that fulfills into a `Pokemon`
     */
    async loadPokemon(name, url)
    {
        try 
        {
            const data = await Util.getJSONFromServer(url)
            return new Pokemon(data)
        }
        catch (error)
        {
            throw new Error(`Couldn't load ${name} from ${url}`)
        }
    }
    get pokemons()
    {
        return this.#pokemons
    }
}