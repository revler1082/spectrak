
var port = process.env.PORT || 3000;
var debug = process.env.NODE_ENV === "development";
var siteRoot = debug ? '/' : '/spectrak/';
var deployPath = 'C:\\inetpub\\wwwroot\\spectrak';

module.exports = {
  port: port,
  host: process.env.WEBSITE_HOSTNAME || `localhost:${port}`,
  debug: debug,
  siteRoot: siteRoot,
  deployPath: deployPath
};
