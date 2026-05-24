/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const parsedData = await response.json();
  return {
    data : parsedData
  }
}

export default fetchModel;
