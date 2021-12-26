import OpenAPIClientAxios from "openapi-client-axios";

const openApi = new OpenAPIClientAxios({definition: {}});
const API_URL = process.env.REACT_APP_API_URL;

const client = openApi.initSync();
client.defaults.baseURL = API_URL;

export default client;