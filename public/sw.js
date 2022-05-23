if (!self.define) {
  let e,
    s = {}
  const n = (n, t) => (
    (n = new URL(n + ".js", t).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script")
          ;(e.src = n), (e.onload = s), document.head.appendChild(e)
        } else (e = n), importScripts(n), s()
      }).then(() => {
        let e = s[n]
        if (!e) throw new Error(`Module ${n} didn’t register its module`)
        return e
      })
  )
  self.define = (t, i) => {
    const c = e || ("document" in self ? document.currentScript.src : "") || location.href
    if (s[c]) return
    let a = {}
    const l = (e) => n(e, c),
      r = { module: { uri: c }, exports: a, require: l }
    s[c] = Promise.all(t.map((e) => r[e] || l(e))).then((e) => (i(...e), a))
  }
}
define(["./workbox-75794ccf"], function (e) {
  "use strict"
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/KUN6S4gElq7vlBtnqC1lL/_buildManifest.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/KUN6S4gElq7vlBtnqC1lL/_ssgManifest.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/156-460d1bd82bb0d721820f.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/1bfc9850-0ce085945e4581486140.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/248-2623dcf45a6519faf44b.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/252f366e-6b7d445e0187c2846b5c.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/257-c3f9232b580daf63d6b7.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/29107295-62449f6ab50432c0efef.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/3-b9f3ab1a32b69a1d590f.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/301-ccd5ef488e5298070d94.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/31-261c43fc30ce6042066f.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/32-d4a98eaca4684f2f5d34.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/439-9b1e8e2b301baed6d333.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/469-29e66a2225c200864ea2.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/493-c5a885b404f784576c2e.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/541-7925bb4c7f19c725c55f.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/545-8de7b24780b6d7294e71.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/575-33b5a3e556ee2f7e8580.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/675-eee76a8283cb0801b299.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/727-6df77978c9b7689ac0d0.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/802-b41d2c7fe6d04cc4509f.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/83-078ae4b060967cd92bc4.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/841-7212d36696eed2bb44e3.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/844-6206a958cd247ee43760.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/861-8e7569608a5055e16c8b.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/882-94af7148be48b9ac0d66.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/947-588770e58fa3fc46c2de.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/framework-dd8fb904977a87adc3cd.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/main-45c460c8f877d78c55e3.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/404-f605dce6cca31f520b14.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/_app-5d06d30d18ee2a8c4d2f.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/_error-ea939aab753d9e9db3bd.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/admin-0f82b8e38778853666b9.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/admin/alerts-92a0d7c779b03480dea9.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/admin/alerts/edit/%5Bid%5D-36ec609de8e64e70877c.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/admin/alerts/new-603b4b4ef96dabc2a6a3.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/admin/categories-7fd20194bc17e44055b6.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/admin/categories/%5Bid%5D-fce5ae77aeeabf375a5f.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/announcements-bcbe123261ed63a100f6.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/announcements/%5Bid%5D-9d1ae628454e9ef67891.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/game-1b718888d743d80594a8.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/game/categories/%5Bid%5D-40c036d53d34b97f900e.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/game/play-5192159c2bd13a77b48e.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/game/result-48a7d8a76804da522da8.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/game/selectCategory-838c5b77b91377c2c057.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/pages/index-f8e4253ab29d112618ed.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/polyfills-e7a279300235e161e32a.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        {
          url: "/_next/static/chunks/webpack-0e0f5c5c9fa5a29e0d78.js",
          revision: "KUN6S4gElq7vlBtnqC1lL",
        },
        { url: "/_next/static/css/1eca0009602ddbccf486.css", revision: "KUN6S4gElq7vlBtnqC1lL" },
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
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: t }) =>
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
