# Prefetch for Fresh
Fresh plugin for prefetching pages powered by Google's [quicklink](https://github.com/GoogleChromeLabs/quicklink).

According to [Google's web development guidelines](https://web.dev/link-prefetch/), prefetching leads to faster load times, resulting in higher conversion rates and better user experiences. Prefetching can be implemented [using the link](https://web.dev/codelab-two-ways-to-prefetch/) tag. 

## Usage

To use this plugin, just add to your fresh config:
```ts
import prefetchPlugin, { Options } from 'https://deno.land/x/prefetch'

const options: Options = {
  throttle: 4 // 4 concurrent requests
  // ...
}

await start(manifest, {
  ...
  plugins: [
    prefetchPlugin(options),
  ],
});
```

Start your fresh server, access your page. All anchor tags containing a relative `href` attribute should be prefetched. To make sure it's working, open the Chrome DevTools `Network` tab and make sure the pages are being prefeetched. 

All serializable options accepted by quicklink are also accepted by this plugin.
