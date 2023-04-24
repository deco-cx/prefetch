import { Plugin } from "$fresh/server.ts";

export interface Options {
  /** Attempt higher priority fetch (low or high) */
  priority?: boolean;
  /** Allowed origins to prefetch (empty allows all) */
  origins?: string[];
  /** Timeout after which prefetching will occur */
  timeout?: number;
  /**
   * The concurrency limit for prefetching
   * @default 10
   */
  throttle?: number;
  /** The area percentage of each link that must have entered the viewport to be fetched */
  threshold?: number;
  /** The total number of prefetches to allow */
  limit?: number;
  /** Time each link needs to stay inside viewport before prefetching (milliseconds) */
  delay?: number;
  /** Option to switch from prefetching and use prerendering only */
  prerender?: boolean;
  /** Option to use both prerendering and prefetching */
  prerenderAndPrefetch?: boolean;
  /**
   * Strategy to prefetch.
   *
   * set opt-in to prefetch only anchor tags containing the data-prefetch attribute
   * set opt-out to ignore only those links with the data-noprefetch attribute
   * set manual to disable listening and fallback to calling prefetch manually
   * set aggresive to prefetch all links
   *
   * @default undefined
   */
  strategy?: "opt-in" | "opt-out" | "manual";
}

const prefetch = (options: Options = {
  throttle: 10,
}): Plugin => {
  const main = `data:application/javascript,
    import * as quicklink from "https://esm.sh/quicklink@2.3.0";

    window.quicklink = quicklink;

    function getOptions (options) {
      if (options.strategy) {
        options.ignores = [
          ...(options.ignores ?? []),
          options.strategy === 'opt-in'
            ? (_uri, elem) => !elem.hasAttribute('data-prefetch')
            : (_uri, elem) => elem.hasAttribute('data-noprefetch')
        ];
      }

      return options;
    };

    function listen (options) {
      return quicklink.listen(getOptions(options))
    };

    export default function(options) {
      if (options.strategy === "manual") {
        return;
      }

      if (document.readyState === "complete" || document.readyState === "loaded"  || document.readyState === "interactive") {
        listen(options);
      } else {
        document.addEventListener("DOMContentLoaded", () => listen(options));
      }
    };`;

  return {
    name: "prefetch",
    entrypoints: { main },
    render: (ctx) => {
      ctx.render();

      return {
        scripts: [{ entrypoint: "main", state: options }],
      };
    },
  };
};

export default prefetch;
