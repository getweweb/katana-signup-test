'use strict';

const getUrlParams = (prop) => {
  let params = {};
  const search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  const definitions = search.split('&');

  definitions.forEach(function(value) {
    var parts = value.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return (prop && prop in params) ? params[prop] : params;
};

export { getUrlParams };
