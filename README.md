# ecmcors

**WIP**

Easily configure multiple CORS.



## Install

I have yet to publish to npm.

```bash
npm install shinshin86/ecmcors
# or
yarn add shinshin86/ecmcors
```



## Usage

Set `CORS_ALLOW_LIST` environment variable

```
# example
CORS_ALLOW_LIST=http://example.com,http://example.net
```

If you do not set the environment variables, all origins are not allowed.



## Example(express)

```javascript
const express = require('express');
const ecmcors = require('ecmcors');

const app = express();

// Only authorized origin will be allowed to pass.
app.get('/', ecmcors, (req, res) => {
  res.status(200)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

```

