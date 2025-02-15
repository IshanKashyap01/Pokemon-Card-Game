import { Player } from './modules/model/Player.js'
import { logError } from './modules/util.js'
import { PokemonLoader } from './modules/model/PokemonLoader.js'
/*
 * @description
 * API link for pokemon list: https://pokeapi.co/api/v2/pokemon/
 * This version loads pokemons as soon as the API fetches the list.
 * However, the pokemons are chosen at random from the same pool for both players
 * and not removed after use.
 */
const loader = new PokemonLoader()
await loader.loadPokemons()
let pokemons = loader.pokemons, player1 = new Player(1), player2 = new Player(2)

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