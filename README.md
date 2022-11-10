# Prefetch for Fresh
Google's [quicklink](https://github.com/GoogleChromeLabs/quicklink) plugin for Fresh.

According to [Google's web development guidelines](https://web.dev/link-prefetch/), prefetching leads to faster load times, resulting in higher conversion rates and better user experiences. Prefetching can be implemented [using the link](https://web.dev/codelab-two-ways-to-prefetch/) tag. 

## Usage

To use this plugin, just add to your fresh config:
```ts
import prefetchPlugin from 'https://deno.land/x/prefetch'

await start(manifest, {
  ...
  plugins: [
    prefetchPlugin(),
  ],
});
```

Start your fresh server, access your page. All anchor tags containing a relative `href` attribute should be prefetched. To make sure it's working, open the Chrome DevTools `Network` tab and make sure the pages are being prefeetched. 

All serializable options accepted by quicklink are also accepted by this plugin.
