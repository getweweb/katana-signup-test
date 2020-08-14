'use strict';
import { Auth0Lock } from 'auth0-lock';
import { loginOptions } from './options/login-options';

const loginForm = (params) => {
  if (params === undefined) return;
  const options = loginOptions(params);
  const lock = new Auth0Lock(params.clientId, params.domain, options);
  lock.show();
};

export { loginForm };
