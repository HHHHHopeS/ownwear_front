
// export const API_BASE_URL = 'https://34.64.221.199:8443';
export const API_BASE_URL = 'https://localhost:8443';
export const ACCESS_TOKEN = 'accessToken';

// export const OAUTH2_REDIRECT_URI = 'https://ownwear-olwpxmaj4a-du.a.run.app/oauth2/redirect'
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'


export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
