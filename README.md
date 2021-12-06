# HackHate2020-BE-MERN

### For dev
#### Add a file called environments.js containing the following, adding port numbers and mongo database connection strings -

```
const environments = {};
environments.test = {
  envName: 'test',
  PORT: <PORT_NUMBER>,
  DB_CONNECTION_STRING: <TEST_DB_CONNECTION_STRING>,
};
environments.development = {
  envName: 'development',
  PORT: <PORT_NUMBER>,
  DB_CONNECTION_STRING: <DEV_DB_CONNECTION_STRING>,
};

module.exports = environments;
```
#### To run for development 
```
npm run serve:dev
```
#### To run tests 
```
npm test
```

### For production
#### Add the port and database connection string for your production environment to the environments.js file
```
environments.production = {
  envName: 'production',
  PORT: <PORT_NUMBER>,
  DB_CONNECTION_STRING: <PROD_DB_CONNECTION_STRING>,
};
```
#### To run for production 
```
npm run serve:prod
```