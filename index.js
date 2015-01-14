var http = require('http');
var dns = require('dns');

var lookup = dns.lookup;

dns.lookup = function() {
  var args = Array.prototype.slice.call(arguments);
  var domain = args[0];
  var callback = args.pop();
  var new_callback = function (err) {
    if (!err) {
      callback.apply(null, arguments);
      return;
    }

    err.message += '. Hostname: ' + domain;
    err.hostname = domain;

    callback(err);
  };
  args.push(new_callback);
  lookup.apply(null, args);
};

http
  .get('http://blabla-yogurt-blabliblu-blo.com', function () {});