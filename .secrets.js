import { BubbleExclamationLine } from "@mithril-icons/clarity"

//NEED TO MOVE THESE TO ENVIRONMENT/GITLAB IN PRODUCTION for manifest
const getUserToken = () =>
  sessionStorage.getItem("sb-user-token")
    ? sessionStorage.getItem("sb-user-token")
    : ""

const makePaypalAuth = (clientId, secret) => btoa(`${clientId}:${secret}`)

const BackEndLess = {
  unregistered: {
    email: "unregistered@sette-bambini.com",
    password: "sette-bambini-bryn",
    objectId: "C1DD7B25-721B-4E51-BA7E-86B91611608A",
  },
  API_KEY: "6FB32F97-89BF-466F-8F6D-06FE7BA2653A",
  APP_ID: "7A0EDE25-0509-5305-FFA3-0FA3A11BEF00",
  baseUrl: "https://api.backendless.com",
  headers: () => ({ "user-token": getUserToken() }),
}

const Back4App = {
  unregistered: {
    email: "unregistered@sette-bambini.com",
    password: "sette-bambini-bryn",
    objectId: "C1DD7B25-721B-4E51-BA7E-86B91611608A",
  },
  baseUrl: "https://sette-bambini.b4a.io",
  headers: () => ({
    "X-Parse-Application-Id": "Lm887wjn77WnIXtb2zDyqwzhn5WguNZRv0Pt3pMg",
    "X-Parse-REST-API-Key": "dJhZZhP9wD7YtdnaAZBn8kIBJRuO8m6Je7Hnh1Pd",
    "X-Parse-Revocable-Session": 1,
    "Content-Type": "application/json",
  }),
}

const Paypal = {
  sandbox: {
    account: "sb-mivlh3949976@business.example.com",
    secret:
      "EBhgUUMx_lQ-A7uCpuf8Qfu-u2SU0Da7x2GtlOADoJcg0nS52au2gtFHap-NvexKmvFzT6zqwmZMIGd",
    clientId:
      "AQm8WLZb23iISBj89RJMe2e7JKbUOyvShFQ62WyHonmdanUzbHVQyFS7C_JznQZj8_HbkbXY_VYGTMmx",
    baseUrl: "https://api.sandbox.paypal.com",
    headers: () => ({
      Accept: "application/json",
      Authorization: `Basic ${makePaypalAuth(
        Paypal.sandbox.clientId,
        Paypal.sandbox.secret
      )}`,
    }),
  },
  account: "settebambini@gmail.com",
  secret:
    "EOv4OU0F-QOxT3TN3ZE8_L4lDSTzz5AeKGaBWSvWzPBC7Z_qldPhBUs-nmxANd5WmIN3DIjxo642DM21",
  clientId:
    "Af350t_1-6Ml2ZiAkYgg1kZcn-LVFV1JTtyAVkT_XWI97U4uUpYVmQHFsV9NPLBAGlDqbZsJhT02ATd_",
  baseUrl: "https://api.paypal.com",
  headers: (mdl) => ({
    Accept: "application/json",
    Authorization: `Bearer ${mdl.paypal.access_token}`,
  }),
}

export { BackEndLess, Paypal, Back4App }
