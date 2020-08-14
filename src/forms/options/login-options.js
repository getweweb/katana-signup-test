'use strict';

const loginOptions = (params) => {
  let redirectUrl = 'https://factory.katanamrp.com/sales';
  let responseType = 'token';

  if (params !== undefined) {
    if (params.redirectUrl) redirectUrl = params.redirectUrl;
    if (params.responseType) responseType = params.responseType;
  }

  var options = {
    rememberLastLogin: false,
    avatar: null,
    container: 'login-container',
    theme: {
      logo: 'https://katanamrp.com/assets/t2.gif',
      primaryColor: '#56B696',
    },
    languageDictionary: {
      title: "Katana Smart Workshop"
    },
    allowSignUp: false,
    auth: {
      params: { scope: 'openid email' },
      redirectUrl: redirectUrl,
      responseType: responseType,
      audience: params.audience
    },
    options: {
      allowedConnections: ['Username-Password-Authentication']
    },
    showTerms: false,
    configurationBaseUrl: 'https://cdn.eu.auth0.com'
  };

  return options;
};

export { loginOptions };
