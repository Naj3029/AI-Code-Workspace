const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.bytsjge.mongodb.net", (err, addresses) => {
  if (err) {
    console.log("DNS ERROR:");
    console.log(err);
  } else {
    console.log("DNS SUCCESS:");
    console.log(addresses);
  }
});