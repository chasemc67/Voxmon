# 👷 `worker-template` Hello World

A template for kick starting a Cloudflare worker project.

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

#### Wrangler

Install wrangler with 
`npm install -g @cloudflare/wrangler`

Login to wrangler to get our OAuth token with
`wrangler login`

Launch dev server with
`wrangler login`

Publish changes with
`wrangler publish --env production`

See getting stared guide [here](https://developers.cloudflare.com/workers/get-started/guide)

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate projectname https://github.com/cloudflare/worker-template
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

