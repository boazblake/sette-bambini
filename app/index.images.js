export const collections = [
  "images/collections/collection0.webp",
  "images/collections/collection1.webp",
  "images/collections/collection2.webp",
  "images/collections/collection3.webp",
  "images/collections/collection4.webp",
  "images/collections/collection5.webp",
  "images/collections/collection6.webp",
  "images/collections/collection7.webp",
  "images/collections/collection8.webp",
]
export const blankets = [
  "images/blankets/blankets0.webp",
  "images/blankets/blankets1.webp",
  "images/blankets/blankets2.webp",
  "images/blankets/blankets3.webp",
]

export const burpies = [
  "images/burps/burp0.webp",
  "images/burps/burp1.webp",
  "images/burps/burp2.webp",
  "images/burps/burp3.webp",
]

export const productImages = {
  Wraps: blankets,
  Blankets: blankets,
  Burpies: burpies,
  Collections: collections,
}

export const AllImages = [...burpies, ...blankets, ...collections]
