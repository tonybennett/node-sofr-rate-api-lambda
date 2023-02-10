# SOFR API Node Lambda

This is a simple Node.js Lambda function that can be used to fetch the latest SOFR rate (or other rate) from the Federal Reserve's API, including some simple caching.

Useful for deploying to a function URL with CORS as `markets.newyorkfed.org/api` does not support CORS.

Can be customized to use any of the other rates available from the API.

- `index.mjs` can be deployed to AWS Lambda without any additional dependencies
- Requires Node.js 18+ runtime as this relies on global fetch
