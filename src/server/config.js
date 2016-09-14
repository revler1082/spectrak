
var port = process.env.PORT || 3000;
var debug = !(process.env.NODE_ENV === "release" ||
            process.env.NODE_ENV === "production" ||
            process.argv.includes('--release'));

debug = false;
var siteRoot = debug ? '/' : '/spectrak/';
var deployPath = 'C:\\inetpub\\wwwroot\\spectrak';

var genesisUsers = [
  { id: 'CONED\\AHMETAJD' },
  { id: 'CONED\\CHEND' },
  { id: 'CONED\\RODRIGUEZM' },
  { id: 'CONED\\AYALAO' },
  { id: 'CONED\\RIZZOJOS' },
  { id: 'CONED\\JUNGR' },
  { id: 'CONED\\BOWERMANJ' }
];

module.exports = {
  port: port,
  host: process.env.WEBSITE_HOSTNAME || `localhost:${port}`,
  debug: debug,
  siteRoot: siteRoot,
  deployPath: deployPath,
  genesisUsers: genesisUsers
};
