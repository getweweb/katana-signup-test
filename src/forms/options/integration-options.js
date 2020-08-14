'use strict';
import moment from 'moment-timezone';

const integrationOptions = (params) => {
  // Variables
  let first_name = null, last_name = null, email = null, company = null, invitationToken = null, state = null, source = null;
  let environment = 'katana';
  let redirectUrl = 'https://factory.katanamrp.com/sales';
  let responseType = 'token';
  let initialScreen = 'signUp';
  let allowLogin = false;
  let allowSignUp = true;
  let passwordInputPlaceholder = 'Create your password';
  const guessedTimezone = moment.tz.guess();

  if (params !== undefined) {
    if (params.redirectUrl) redirectUrl = params.redirectUrl;
    if (params.responseType) responseType = params.responseType;
    if (params.environment) environment = params.environment;

    // getting ParsedParams for form prefill
    if (params.parsedParams) {
      let parsedParams = params.parsedParams;
      if (parsedParams.first_name) first_name = parsedParams.first_name;
      if (parsedParams.last_name)  last_name = parsedParams.last_name;
      if (parsedParams.email) email = parsedParams.email;
      if (parsedParams.company) company = parsedParams.company;
      if (parsedParams.factoryName) company = parsedParams.factoryName;
      if (parsedParams.source) source = parsedParams.source;
      if (parsedParams.invitationToken) invitationToken = parsedParams.invitationToken;
      if (parsedParams.state) state = parsedParams.state;
      if (parsedParams.redirectUrl) redirectUrl = parsedParams.redirectUrl;

      // Settings values based on parsedParams
      if (parsedParams.register && parsedParams.redirectUrl) {
        responseType = 'code';
      }

      if (parsedParams.register === 'false') {
        initialScreen = 'login';
        allowSignUp = false;
        allowLogin = true;
        passwordInputPlaceholder = 'Enter your password';
      }
    }
  }

  var options = {
    allowLogin: allowLogin,
    allowSignUp: allowSignUp,
    rememberLastLogin: false,
    avatar: null,
    container: 'login-container',
    theme: {
      logo: "https://katanamrp.com/assets/t2.gif",
      primaryColor: '#56B696'
    },
    languageDictionary: {
      passwordInputPlaceholder: passwordInputPlaceholder
    },
    auth: {
      params: { scope: 'openid email' },
      redirectUrl: redirectUrl,
      responseType: responseType,
      audience: params.audience
    },
    options: {
      allowedConnections: ['Username-Password-Authentication']
    },
    prefill: { email: email },
    initialScreen: initialScreen,
    showTerms: false,
    additionalSignUpFields: [
      {
        name: "first_name",
        placeholder: "First name",
        validator: function(first_name) {
          return {
             valid: first_name.length >= 3,
             hint: "Must have 1 or more chars" // optional
          };
        },
        prefill: first_name
      },
      {
        name: "last_name",
        placeholder: "Last name",
        validator: function(last_name) {
          return {
             valid: last_name.length >= 3,
             hint: "Must have 1 or more chars" // optional
          };
        },
        prefill: last_name
      },
      {
        name: "company",
        placeholder: "Company name",
        validator: function(company) {
          return {
             valid: company.length >= 3,
             hint: "Must have 3 or more chars" // optional
          };
        },
        prefill: company
      },
      {
        name: "timezone",
        type: "hidden",
        value: guessedTimezone,
        validator: () => true,
      },
      {
        name: "environment",
        type: "hidden",
        value: environment,
        validator: () => true,
      },
      {
        name: "invitationToken",
        type: "hidden",
        value: invitationToken,
        validator: () => true,
      },
      {
        name: "state",
        type: "hidden",
        value: state,
        validator: () => true,
      },
      {
        name: "source",
        type: "hidden",
        value: source,
        validator: () => true,
      }
    ],
    configurationBaseUrl: 'https://cdn.eu.auth0.com'
  };

  return options;
};

export { integrationOptions };
