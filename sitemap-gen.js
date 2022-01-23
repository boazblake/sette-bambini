const xml = require("xml")
const { writeFile } = require("fs")

const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const domain = "https://boazblake.github.io/sette-bambini/#!"
const date = () => new Date().toISOString().split("T")[0]

const ROUTES = [
  "/",
  "/login",
  "/register",
  "/cart",
  "/checkout",
  "/Burpies",
  "/blankets",
  "/collections",
  "/about-us",
  "/contact-us",
  "/returns",
  "/terms-of-service",
  "/privacy-policy",
  "/partnerships",
  "/safety-information",
  "/faq",
]

const toSiteMapper = (sitemapDto) =>
  `<?xml version="1.0" encoding="UTF-8"?>${xml(sitemapDto)}`

const toSiteMapObj = (sitemapRoutes) => ({
  urlset: [
    {
      _attrs: {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
      },
    },
    ...sitemapRoutes,
  ],
})

const formatIndex = (_) => ({
  url: [
    {
      loc: domain,
    },
    {
      lastmod: date(),
    },
    { changeFreq: "daily" },
    { priority: "1.0" },
  ],
})

const formatRoute = (route) => ({
  url: [
    {
      loc: `${domain}${route}`,
    },
    { lastmod: date() },
  ],
})

const sitemapRoutes = (routes) =>
  routes.map((route) =>
    route === "/" ? formatIndex(route) : formatRoute(route)
  )

const createSitemap = (xs) => Promise.resolve(sitemapRoutes(xs))

const toWriteFile = (cb) => (sitemap) =>
  writeFile("./app/assets/sitemap.xml", sitemap, "utf8", cb)

const resolve = (x) => x

const go = (routes) =>
  createSitemap(routes)
    .then(toSiteMapObj)
    .then(toSiteMapper)
    .then(toWriteFile(resolve))
    .then(log("S"), log("E"))

go(ROUTES)
