/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 */
async function fetchModel(url) {
  // 1. Grab the token we saved during login
  const token = localStorage.getItem("token");

  // 2. Prepare the fetch options with headers
  const options = {
    method: "GET",
    headers: {},
  };

  // 3. If a token exists, attach it as a Bearer token
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  // 4. Make the fetch request with our new headers
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const parsedData = await response.json();
  return {
    data: parsedData,
  };
}

export default fetchModel;
