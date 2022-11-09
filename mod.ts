import { Plugin } from "$fresh/server.ts";

export interface Options {
  prefetch?: 'all'
};

const prefetch = ({ prefetch }: Options = {}): Plugin => {
  const main = `data:application/javascript,export default function (state) {
    if (window.requestIdleCallback) {
      // prefetched links set
      const prefetched = new Set();

      // only prefetch relative links
      const isRelativeUrl = (href) => typeof href === "string" && !/^http(s)?:\/\/|#/.test(href);

      const createPrefetchLink = (href) => {
        console.log('Prefetchig', href);
        const linkTag = document.createElement('link');
        linkTag.rel = 'prefetch';
        linkTag.href = href;
        linkTag.as = 'document';
        document.head.appendChild(linkTag);
      };
  
      window.requestIdleCallback(() => {
        document.querySelectorAll("${prefetch === 'all' ? "a" : "a[prefetch]"}").forEach((element) => {
          const href = element.getAttribute("href");
  
          if (isRelativeUrl(href) && prefetched.has(href) === false) {
            prefetched.add(href);
            createPrefetchLink(href);
          }
        })
      });
    }
  }`

  return {
    name: 'prefetch',
    entrypoints: { main },
    render: (ctx) => {
      ctx.render()

      return {
        scripts: [{ entrypoint: 'main', state: {} }]
      }
    }
  }
}

export default prefetch

