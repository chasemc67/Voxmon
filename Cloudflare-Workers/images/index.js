addEventListener("fetch", event => {
  event.respondWith(handleRequest(event))
})

// REDACTED FOR SECURITY
const BUCKET_URL = "REDACTED";

async function handleRequest(event) {
  if (event.request.method === "GET") {
    let response = await serveAsset(event)
    if (response.status > 399) {
      response = new Response(response.statusText, { status: response.status })
    }
    return response
  } else {
    return new Response("Method not allowed", { status: 405 })
  }
}

async function serveAsset(event) {
  const url = new URL(event.request.url);
  const cache = caches.default;
  let response = await cache.match(event.request);

  // since we have our route as /preview/ in prod 
  // we need to just get the filename after that part
  const filename = url.pathname.split("/")[2];

  if (!response) {
    response = await fetch(`${BUCKET_URL}/${filename}?alt=media`, {
      cf: {
        image: {
          width: 512,
          height: 512,
          fit: 'scale-down'
        }
      }
    });
    const headers = { "cache-control": "public, max-age=345600" }
    response = new Response(response.body, { ...response, headers })
    event.waitUntil(cache.put(event.request, response.clone()))
  }
  return response;
}
