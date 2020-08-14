'use strict';

const authOptions = {
  staging: {
    clientId: 'xEsagdq6C84aZYN2860C12T691KrbwUE',
    domain: 'login-staging.katanamrp.com',
    redirectUrl: 'https://katana-ui-staging.herokuapp.com/sales',
    audience: 'https://katana-ui-staging.herokuapp.com/'
  },
  production: {
    clientId: 'fhZWp3TRAtS3U0X3QXk-Ct4Awxzc92P3',
    domain: 'login.katanamrp.com',
    audience: 'https://factory.katanamrp.com/',
  }
};

export { authOptions };
