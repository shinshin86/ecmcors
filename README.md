# ecmcors

[![Build Status](https://travis-ci.org/shinshin86/ecmcors.svg?branch=master)](https://travis-ci.org/shinshin86/ecmcors)

Easily configure multiple CORS.

## Install

```bash
npm install ecmcors
# or
yarn add ecmcors
```

## Usage

Set `CORS_ALLOW_LIST` environment variable.

```bash
# If you have multiple origin, you can specify them by separating them with a comma.
CORS_ALLOW_LIST=http://example.com,http://example.net

# If you want to test on a localhost.
CORS_ALLOW_LIST=http://localhost:3000
```

If you do not set the environment variables, all origins are not allowed.

## Example(express)

```javascript
const express = require('express');
const ecmcors = require('ecmcors');

const app = express();

// Only authorized origin will be allowed to pass.
app.get('/', ecmcors, (req, res) => {
  res.status(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
```

## Development

Test

```bash
npm run test
```

Code format

```bash
npm run fmt
```
