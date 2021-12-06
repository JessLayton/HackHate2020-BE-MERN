const environments = require('./environments');

const currentEnvironment = process.env.NODE_ENV;
const environmentToExport = environments[currentEnvironment]
  ? environments[currentEnvironment] : environments.development;

module.exports = environmentToExport;
