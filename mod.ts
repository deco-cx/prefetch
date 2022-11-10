import { Plugin } from "$fresh/server.ts";

export interface Options {
  /** Attempt higher priority fetch (low or high) */
  priority?: boolean
  /** Allowed origins to prefetch (empty allows all) */
  origins?: string[]
  /** Timeout after which prefetching will occur */
  timeout?: number
  /** 
   * The concurrency limit for prefetching 
   * @default 2
   * */
  throttle?: number
  /** The area percentage of each link that must have entered the viewport to be fetched */
  threshold?: number
  /** The total number of prefetches to allow */
  limit?: number
  /** Time each link needs to stay inside viewport before prefetching (milliseconds) */
  delay?: number
  /** Option to switch from prefetching and use prerendering only */
  prerender?: boolean
  /** Option to use both prerendering and prefetching */
  prerenderAndPrefetch?: boolean
};

const prefetch = (options: Options = {
  throttle: 4,
}): Plugin => {
  const main = `data:application/javascript,
    import { listen, prefetch } from "https://esm.sh/quicklink@2.3.0";

    const prefetchOnViewport = (options) => {
      if (document.readyState === "complete" || document.readyState === "loaded"  || document.readyState === "interactive") {
        listen(options);
      } else {
        document.addEventListener("DOMContentLoaded", () => listen(options));
      }
    };

    const prefetchOnMouseOver = (options) => {
      const origins = options.origins || [location.hostname];

      document.querySelectorAll('a').forEach((a) => {
        if (Array.isArray(origins) && origins.includes(a.hostname)) {
          a.addEventListener("mouseover", () => prefetch(a.href));
        }
      });
    };

    export default function(options) {
      const hasMouse = matchMedia('(pointer:fine)').matches;

      if (!hasMouse) {
        prefetchOnViewport(options);
      } else {
        prefetchOnMouseOver(options);
      }
    };`

  return {
    name: 'prefetch',
    entrypoints: { main },
    render: (ctx) => {
      ctx.render()

      return {
        scripts: [{ entrypoint: 'main', state: options }]
      }
    }
  }
}

export default prefetch

