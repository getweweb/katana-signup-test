'use strict';
import { Auth0Lock } from 'auth0-lock';
import { getUrlParams } from './helper';
import { integrationOptions } from './options/integration-options';

const integrationForm = (params) => {
  if (params === undefined) return;
  const parsedParams = getUrlParams();
  if (parsedParams) params.parsedParams = parsedParams;

  const options = integrationOptions(params);

  if (parsedParams.source === "quickbooks") {
    document.getElementById('quickBooksInfoText').style.display = 'block';
  }
  if (parsedParams.source === "shopify") {
    document.getElementById('shopifyInfoText').style.display = 'block';
  }

  var lock = new Auth0Lock(params.clientId, params.domain, options);
  lock.show();
};

export { integrationForm };
