"use strict";
import moment from "moment-timezone";

const signupOptions = (params) => {
  // Variables
  let partnerKey, environment;
  let redirectUrl = "https://factory.katanamrp.com/sales";
  let responseType = "token";
  let showPhoneNumberField = true;
  let passwordInputPlaceholder = "Create your password";
  const guessedTimezone = moment.tz.guess();

  if (params !== undefined) {
    if (params.redirectUrl) redirectUrl = params.redirectUrl;
    if (params.responseType) responseType = params.responseType;
    if (params.environment) environment = params.environment;
    if (typeof growsumo !== "undefined" && growsumo.data) {
      partnerKey = growsumo.data["partner_key"];
    }
    if (params.showPhoneNumberField) showPhoneNumberField = true;
  }

  var options = {
    rememberLastLogin: false,
    avatar: null,
    container: "login-container",
    theme: {
      logo: "https://katanamrp.com/assets/t2.gif",
      primaryColor: "#56B696",
    },
    languageDictionary: {
      passwordInputPlaceholder: passwordInputPlaceholder,
    },
    allowLogin: false,
    auth: {
      params: { scope: "openid email" },
      redirectUrl: redirectUrl,
      responseType: responseType,
      audience: params.audience,
    },
    options: {
      allowedConnections: ["Username-Password-Authentication"],
    },
    showTerms: false,
    additionalSignUpFields: [
      {
        name: "first_name",
        placeholder: "First name",
        validator: function(first_name) {
          return {
            valid: first_name.length >= 3,
            hint: "Must have 3 or more chars",
          };
        },
      },
      {
        name: "last_name",
        placeholder: "Last name",
        validator: function(last_name) {
          return {
            valid: last_name.length >= 3,
            hint: "Must have 3 or more chars",
          };
        },
      },
      {
        name: "company",
        placeholder: "Company name",
        validator: function(company) {
          return {
            valid: company.length >= 3,
            hint: "Must have 3 or more chars",
          };
        },
      },
      {
        name: "timezone",
        type: "hidden",
        value: guessedTimezone,
        validator: () => true,
      },
      {
        name: "partnerKey",
        type: "hidden",
        value: partnerKey,
        validator: () => true,
      },
      {
        name: "environment",
        type: "hidden",
        value: environment,
        validator: () => true,
      },
    ],
    configurationBaseUrl: "https://cdn.eu.auth0.com",
  };

  const phoneNumberFiled = {
    name: "phone",
    placeholder: "Phone number",
    validator: function(phone) {
      return {
        valid: phone.length >= 5,
        hint: "Invalid phone number",
      };
    },
  };

  if (showPhoneNumberField) {
    options.additionalSignUpFields.push(phoneNumberFiled);
  }
  return options;
};

export { signupOptions };
