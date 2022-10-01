if (!self.define) {
  let e,
    s = {}
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script")
          ;(e.src = i), (e.onload = s), document.head.appendChild(e)
        } else (e = i), importScripts(i), s()
      }).then(() => {
        let e = s[i]
        if (!e) throw new Error(`Module ${i} didn’t register its module`)
        return e
      })
  )
  self.define = (n, t) => {
    const c = e || ("document" in self ? document.currentScript.src : "") || location.href
    if (s[c]) return
    let a = {}
    const r = (e) => i(e, c),
      d = { module: { uri: c }, exports: a, require: r }
    s[c] = Promise.all(n.map((e) => d[e] || r(e))).then((e) => (t(...e), a))
  }
}
define(["./workbox-75794ccf"], function (e) {
  "use strict"
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/_next/server/middleware-build-manifest.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        {
          url: "/_next/server/middleware-react-loadable-manifest.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        { url: "/_next/static/chunks/175-ec1c919cf5813e99.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        {
          url: "/_next/static/chunks/1bfc9850-cb241ba328222adc.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        { url: "/_next/static/chunks/23-6cd40375d7c01d4f.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/247-b4c1991de09a1b7b.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        {
          url: "/_next/static/chunks/252f366e-cad74fe5e7a5e65e.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/29107295-fbcfe2172188e46f.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        { url: "/_next/static/chunks/525-8b01dff350bb0a87.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/54-4c61611b1119ff65.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/566-b9d1f23298b93842.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/571-f2bc6216c6e8373b.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/610-c344da87284e9c86.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/631-b14ae5cc9003fe5d.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/635-db541febd050aee5.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/664-e5f3c316f939b2d6.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/694-d654b916ae6567f0.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/712-08900827b5d04ed7.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/727-a6509986567a290c.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/753-21212d94e546afcc.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/791-95d2400e807b87cd.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/802-52f523b5c8d5d4f1.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/858-d2ac62c79c57f6d4.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/869-a97b56bacf921573.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/903-885aa74efc0a1803.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        { url: "/_next/static/chunks/928-115f7b587f30429e.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        {
          url: "/_next/static/chunks/framework-d6187013b4fd348d.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        { url: "/_next/static/chunks/main-bfc2ac27218927f7.js", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        {
          url: "/_next/static/chunks/pages/404-a25e180f036e9a87.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/_app-0d6351213ac7829f.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/_error-942918685354aae9.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/admin-b220db85a12e194a.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/admin/alerts-93725b17388a2533.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/admin/alerts/edit/%5Bid%5D-8d4fa174fb647911.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/admin/alerts/new-b045fe2c8ead504a.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/admin/categories-1522f223f3539687.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/admin/categories/%5Bid%5D-d807849f16f4f344.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/announcements-1c0d7cc00b8984ad.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/announcements/%5Bid%5D-161b5429dc0c6d59.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/game-f848b896069d93bf.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/game/categories/%5Bid%5D-7f2949dca3955b33.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/game/play-73a2f38ccfcdf72d.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/game/result-3ace319477e4a422.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/game/selectCategory-dd7d98f163022037.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/pages/index-55aede864f969d2f.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/polyfills-0d1b80a048d4787e.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/chunks/webpack-42cdea76c8170223.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        { url: "/_next/static/css/81b5f126341b59ae.css", revision: "gIHVdOiVY4S-Y1NMHQN3j" },
        {
          url: "/_next/static/gIHVdOiVY4S-Y1NMHQN3j/_buildManifest.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        {
          url: "/_next/static/gIHVdOiVY4S-Y1NMHQN3j/_ssgManifest.js",
          revision: "gIHVdOiVY4S-Y1NMHQN3j",
        },
        { url: "/assets/audio/correct.wav", revision: "2173ce778741f7c99b796d92439f057e" },
        { url: "/assets/img/landing/play.png", revision: "4398c8f17c41b155b8e70f4118dfbacd" },
        { url: "/favicon.ico", revision: "461a59daf18514919e88f4f7ba61b6ef" },
        { url: "/images/icons/icon-128x128.png", revision: "d3269cc8e987acaf546bb0fe467754df" },
        { url: "/images/icons/icon-144x144.png", revision: "8e013ac9de2f67f96098138994161640" },
        { url: "/images/icons/icon-152x152.png", revision: "9a661923ff90770b32bed3dd43352c54" },
        { url: "/images/icons/icon-192x192.png", revision: "832c09100c8769e5e5ad7f242fce45b2" },
        { url: "/images/icons/icon-384x384.png", revision: "0bfc3eca63cac88fd7d2c467904e93ef" },
        { url: "/images/icons/icon-512x512.png", revision: "20efe4078f49838dbb5784baa1612bf9" },
        { url: "/images/icons/icon-72x72.png", revision: "d6d5d719ba5d771273f46a90f7bdbd25" },
        { url: "/images/icons/icon-96x96.png", revision: "433d2a55cde6f5c2d401cd9e621e3bf6" },
        { url: "/logo.png", revision: "5bd5546d2b6a2318b19c26ebb4074e16" },
        { url: "/manifest.json", revision: "2446eafbf965513a5c328c07818b16e0" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: i, state: n }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      "GET"
    )
})
