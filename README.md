# aswbe_datadog_poc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.
To run this POC, 

1. configure `datadog` section on `package.json`, please see below:

```json
...
  "datadog": {
    "apikey": "your datadog api key",
    "appkey": "your datadog app key",
    "clienttoken": "your datadog client token",
    "service": "aswbe:spa:poc",
    "env": "dev",
    "site": "ap1.datadoghq.com", // for japan region
    "sourcemappath": "./dist/datadog-poc", // angular build path
    "minifiedpath": "http://localhost:4300/" // => docker url for deploy
  },
...
```


2. please make sure to run scripts below:

```bash
yarn install
yarn build
yarn docker:run
```
