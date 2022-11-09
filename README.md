# Prefetch for Fresh
Automatic link<rel=prefetch> tag generation based on anchor <a> tags for Fresh.

According to [Google's web development guidelines](https://web.dev/link-prefetch/), prefetching leads to faster load times, resulting in higher conversion rates and better user experiences. Prefetching can be implemented [using the link](https://web.dev/codelab-two-ways-to-prefetch/) tag. 

## Usage

To use this plugin, just add to your fresh config:
```ts
import prefetchPlugin from 'https://deno.land/x/prefetch'

await start(manifest, {
  ...
  plugins: [
    prefetchPlugin({ prefetch: 'all' }),
  ],
});
```

Start your fresh server, access your page. All anchor tags containing a relative `href` attribute should be prefetched. To make sure it's working, open the Chrome DevTools `Network` tab and make sure the pages are being prefeetched. 

## Options
Prefetching all links can be costly for pages with a large amount of links. To prefetch only certain links, remove the `prefetch: 'all'` option like:
```ts
import prefetchPlugin from 'https://deno.land/x/prefetch'

await start(manifest, {
  ...
  plugins: [
    prefetchPlugin(),
  ],
});
```

Now, only anchor tags containing the `prefetch` attribute will be prefetched. To prefetch a link, add to your components:
```tsx
function MyComponent() {
  return (
    <>
      <a id="home" href="/" /> 
      <a id="about" href="/about" prefetch />
    </>
  )
}
```

In the example above, the `about` link will be prefetched, while the `home` link will not.

