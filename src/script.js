/**
 * @description
 * API link for pokemon list: https://pokeapi.co/api/v2/pokemon/
 * This version loads pokemons as soon as the API fetches the list.
 * However, the pokemons are chosen at random from the same pool for both players
 * and not removed after use.
 */
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
class Pokemon 
{
    constructor(pokemon) 
    {
        this.img = pokemon['sprites']['other']['dream_world']['front_default']
        this.name = pokemon['name']
        this.experience = pokemon['base_experience']
        this.abilities = pokemon['abilities'].map(obj => obj['ability']['name'])
    }
}
/**
 * Model representation of a player
 */
class Player
{
    #view
    #pokemon
    constructor(id)
    {
        this.id = id
        this.score = 0
        this.#view = new PlayerView(id)
    }
    set pokemon(pokemon)
    {
        this.#pokemon = pokemon
        this.#view.renderPokemon(pokemon)
    }
    incrementScore()
    {
        this.#view.updateScore(++this.score)
    }
    get pokemon()
    {
        return this.#pokemon
    }
    isWinner(player)
    {
        return this.pokemon.experience > player.pokemon.experience
    }
    static getWinner(player1, player2)
    {
        return player1.isWinner(player2) ? player1 : player2
    }
}
/**
 * Represents the Player card in the page
 */
class PlayerView
{
    constructor(id)
    {
        this.playerContainer = document.querySelector(`#player${id}`)
        this.img = this.playerContainer.querySelector('img')
        this.scoreElement = this.playerContainer.querySelector('.score')
        this.nameElement = this.playerContainer.querySelector('.name')
        this.experienceElement = this.playerContainer.querySelector('.experience')
        this.abilitiesContainer = this.playerContainer.querySelector('.abilities')
    }
    /**
     * Renders a pokemon for the player
     * @param {Pokemon} pokemon Pokemon to render
     */
    renderPokemon(pokemon)
    {
        this.img.src = pokemon.img
        this.nameElement.textContent = pokemon.name
        this.experienceElement.textContent = pokemon.experience
        const abilityElements = pokemon.abilities.map((ability) => this.#createAbility(ability))
        this.abilitiesContainer.replaceChildren(...abilityElements)
    }
    /**
     * Creates an HTML element representing a pokemon ability
     * @param {String} ability name of the ability
     * @returns HTML element
     */
    #createAbility(ability)
    {
        const abilityElement = document.createElement('div')
        abilityElement.classList.add('ability')
        abilityElement.textContent = ability
        return abilityElement
    }
    updateScore(score)
    {
        this.scoreElement.textContent = `Score: ${score}`
    }
}

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
    try
    {
        const response = await fetch(url)
        const data = await handleAPIResponse(response)
        return data
    }
    catch(error)
    {
        throw error
    }
}
/**
 * Handles API response by either throwing an error (if applicable) or returns
 * a promise for the data
 * @param {Promise} response response from the `fetch()` API
 * @returns data from the API
 */
function handleAPIResponse(response)
{
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