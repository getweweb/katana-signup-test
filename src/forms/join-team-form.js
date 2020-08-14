'use strict';
import { Auth0Lock } from 'auth0-lock';
import { getUrlParams } from './helper';
import { integrationOptions } from './options/integration-options';

const joinTeamForm = (params) => {
  if (params === undefined) return;
  const parsedParams = getUrlParams();
  if (parsedParams) params.parsedParams = parsedParams;

  if (parsedParams.firstName) {
    var firstName = document.getElementById('join-team-first-name');
    firstName.innerHTML = parsedParams.firstName;
  }

  if (parsedParams.factoryName) {
    var factoryName = document.getElementById('join-team-factory-name');
    factoryName.innerHTML = parsedParams.factoryName;
  }

  const options = integrationOptions(params);

  var lock = new Auth0Lock(params.clientId, params.domain, options);

  lock.show();

  lock.on('show', function() {
    setTimeout(function() {
      var emailInput = document.querySelector('div.auth0-lock-input-block.auth0-lock-input-email input');
      if (emailInput) {
        emailInput.setAttribute('disabled', true);
      }
    }, 1000);
  });
};

export { joinTeamForm };
