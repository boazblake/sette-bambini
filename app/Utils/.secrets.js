//NEED TO MOVE THESE TO ENVIRONMENT/GITLAB IN PRODUCTION for manifest

const getUserToken = () =>
  sessionStorage.getItem("sb-user-token")
    ? sessionStorage.getItem("sb-user-token")
    : ""

const BackEnd = {
  API_KEY: "6FB32F97-89BF-466F-8F6D-06FE7BA2653A",
  APP_ID: "7A0EDE25-0509-5305-FFA3-0FA3A11BEF00",
  baseUrl: "https://api.backendless.com",
  headers: () => ({ "user-token": getUserToken() }),
}

export { BackEnd }
