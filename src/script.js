import {Pokemon} from './modules/model/Pokemon.js'
import { Player } from './modules/model/Player.js'
/*
 * @description
 * API link for pokemon list: https://pokeapi.co/api/v2/pokemon/
 * This version loads pokemons as soon as the API fetches the list.
 * However, the pokemons are chosen at random from the same pool for both players
 * and not removed after use.
 */

let pokemons, player1 = new Player(1), player2 = new Player(2)

loadPokemons('https://pokeapi.co/api/v2/pokemon/')

document.querySelector('#fight').addEventListener('click', function (){
    let p1 = pokemons[Math.floor(Math.random() * (pokemons.length - 1))].promise
    let p2 = pokemons[Math.floor(Math.random() * (pokemons.length - 1))].promise
    Promise.all([p1, p2])
        .then((values) => {
            player1.pokemon = values[0]
            player2.pokemon = values[1]
            Player.getWinner(player1, player2).incrementScore()
            return [player1.pokemon.name, player2.pokemon.name]
        })
        .then((pokemonNames) => console.log(`${pokemonNames}`))
        .catch(logError)
})
/**
 * Loads all pokemons from the server into the `pokemons` global variable
 * @param {String} url URL of the resource
 */
async function loadPokemons(url)
{
    try
    {
        const data = await getJSONFromServer(url)
        const results = data['results']
        pokemons = results.map((result) => {
            return {url: result['url'], promise: loadPokemon(result['url'])}
        })
    }
    catch(error)
    {
        logError(error)
    }
}
/**
 * Fetches and parses JSON data from the given URL
 * @param {String} url URL of the resource to be fetched
 * @returns `Promise` that resolves into the parsed JSON data from server
 */
async function getJSONFromServer(url)
{
    const response = await fetch(url)
    if(!response.ok)
    {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    return response.json()
}
/**
 * Logs the error to console and notifies the user through an alert message
 * @param {Error} error error thrown
 */
function logError(error)
{
    console.error(error.message)
    alert(`Couldn't load pokemon card from server! Try waiting or refreshing`)
}
/**
 * Loads a pokemon from the API
 * @param {String} url URL of the pokemon's API
 * @returns `Promise` that fulfills into a `Pokemon`
 */
async function loadPokemon(url)
{
    try 
    {
        const data = await getJSONFromServer(url)
        return new Pokemon(data)
    }
    catch (error)
    {
        throw new Error(`Couldn't load pokemon from ${url}`)
    }
}