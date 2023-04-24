# Prefetch for Fresh

Fresh plugin for prefetching pages powered by Google's
[quicklink](https://github.com/GoogleChromeLabs/quicklink).

According to
[Google's web development guidelines](https://web.dev/link-prefetch/),
prefetching leads to faster load times, resulting in higher conversion rates and
better user experiences. Prefetching can be implemented
[using the link](https://web.dev/codelab-two-ways-to-prefetch/) tag.

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

Start your fresh server, access your page. All anchor tags containing a relative
`href` attribute should be prefetched. To make sure it's working, open the
Chrome DevTools `Network` tab and make sure the pages are being prefeetched.

All serializable options accepted by quicklink are also accepted by this plugin.

### Strategies

To allow better control over which links are prefetched, this plugin adds an
option called `strategy`. When set, two different strategies for prefetching are
allowed `opt-in`, `opt-out`.

`opt-in` means only links containing the data-prefetch attribute will be
prefetched. For instance, if you have two links:

```html
<a href="/foo" data-prefetch />
<a href="/bar" />
```

only `/foo` will be prefetched once it enters the viewport

`opt-out` does exactly the opposite from the previous strategy. It prefetches
all links but those containing `data-noprefetch`. For instance

```html
<a href="/foo" data-noprefetch />
<a href="/bar" />
```

will prefetch `/bar`.

`manual` disables listening and requires you to call `window.QuickLink.prefetch`
manually

Not setting `options.strategy` will make this plugin fallback to the usual
quicklink's behavior, i.e. viewport based prefetching
