/**
 * Fetches and parses JSON data from the given URL
 * @param {String} url URL of the resource to be fetched
 * @returns `Promise` that resolves into the parsed JSON data from server
 */
export async function getJSONFromServer(url)
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
export function logError(error)
{
    console.error(error.message, error.stack)
    alert(`Couldn't load pokemon card from server! Try waiting or refreshing`)
}