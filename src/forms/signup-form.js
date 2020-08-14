'use strict';
import { Auth0Lock } from 'auth0-lock';
import { signupOptions } from './options/signup-options';

const signupForm = (params) => {
  if (params === undefined) return;
  const options = signupOptions(params);
  var lock = new Auth0Lock(params.clientId, params.domain, options);
  console.log(lock);
  lock.show();
};

export { signupForm };
