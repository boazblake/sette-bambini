//NEED TO MOVE THESE TO ENVIRONMENT/GITLAB IN PRODUCTION for manifest
const getUserToken = () =>
  sessionStorage.getItem("sb-user-token")
    ? sessionStorage.getItem("sb-user-token")
    : ""

const makePaypalAuth = (clientId, secret) => btoa(`${clientId}:${secret}`)

const BackEnd = {
  API_KEY: "6FB32F97-89BF-466F-8F6D-06FE7BA2653A",
  APP_ID: "7A0EDE25-0509-5305-FFA3-0FA3A11BEF00",
  baseUrl: "https://api.backendless.com",
  headers: () => ({ "user-token": getUserToken() }),
}

const Paypal = {
  sandbox: {
    account: "sb-r4cz03908927@business.example.com",
    secret:
      "EMdqbGMRiR0scvGjxw4Axc2JxEfmot3USd0sVxZ3Hd4si8DztSwGi-QH7h9dt7vAiEjez-tnLBr393k9",
    clientId:
      "AaFOPqfJCxSbcFIlTxEI2Lo7E7WE6bJ35RiKwNwFLSAc5mlGmeyJPeYSZH4W380jqXOzCf2z6zUMAV4P",
    baseUrl: "https://api-m.sandbox.paypal.com",
    headers: () => ({
      Accept: "application/x-www-form-urlencoded",
      "Accept-Language": "en_US",
      "content-type": "x-www-form-urlencoded",
      Authorization: `Basic ${makePaypalAuth(
        Paypal.sandbox.clientId,
        Paypal.sandbox.secret
      )}`,
    }),
  },
  account: "sb-r4cz03908927@business.example.com",
  secret:
    "EMdqbGMRiR0scvGjxw4Axc2JxEfmot3USd0sVxZ3Hd4si8DztSwGi-QH7h9dt7vAiEjez-tnLBr393k9",
  clientId:
    "AaFOPqfJCxSbcFIlTxEI2Lo7E7WE6bJ35RiKwNwFLSAc5mlGmeyJPeYSZH4W380jqXOzCf2z6zUMAV4P",
  baseUrl: "https://api.paypal.com",
  headers: (mdl) => ({
    Accept: "application/json",
    "Accept-Language": "en_US",
    "Content-Type": "application/json",
    Authorization: `Bearer ${mdl.paypal.access_token}`,
  }),
}

export { BackEnd, Paypal }
