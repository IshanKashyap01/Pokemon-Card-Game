import { PokemonLoader } from '../model/PokemonLoader.js'
import {Player} from '../model/Player.js'
import { logError } from '../util.js'
import { PlayerController } from './PlayerController.js'
import { PlayerView } from '../view/PlayerView.js'

/**
 * Sets up and manages the game
 */
export class GameEngine
{
    /**
     * Pokemon loader to get pokemons from the API
     */
    #loader
    /**
     * The first player
     */
    #player1
    /**
     * The second player
     */
    #player2
    /**
     * View for the first player
     */
    #view1
    /**
     * View for the second player
     */
    #view2
    /**
     * Controller for the first player
     */
    #controller1
    /**
     * Controller for the second player
     */
    #controller2
    /**
     * Creates the players, loads the views and initialises the controllers
     */
    constructor()
    {
        this.#player1 = new Player()
        this.#player2 = new Player()
        this.#view1 = new PlayerView(1)
        this.#view2 = new PlayerView(2)
        this.#loader = new PokemonLoader()
        this.#controller1 = new PlayerController(this.#player1, this.#view1, true)
        this.#controller2 = new PlayerController(this.#player2, this.#view2, false)
    }
    /**
     * Fetches the pokemons from the API
     */
    async setUpGame()
    {
        await this.#loader.loadPokemons()
    }
    /**
     * Assigns a random pokemon to both players, then finds the winner
     */
    beginFight()
    {
        const pokemons = this.#loader.pokemons
        let p1 = pokemons[Math.floor(Math.random() * (pokemons.length - 1))]
        let p2 = pokemons[Math.floor(Math.random() * (pokemons.length - 1))]
        Promise.all([p1.promise, p2.promise])
            .then((values) => {
                this.#controller1.changePokemon(values[0])
                this.#controller2.changePokemon(values[1])
                if(this.#player1.isWinner(this.#player2))
                {
                    this.#controller1.incrementScore()
                }
                else if(this.#player2.isWinner(this.#player1))
                {
                    this.#controller2.incrementScore()
                }
                return [this.#player1.pokemon.name, this.#player2.pokemon.name]
            })
            .then((pokemonNames) => console.log(`${pokemonNames}`))
            .catch(logError)
    }
}