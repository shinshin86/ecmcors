const cors = require('cors');

const corsAllowList = process.env.CORS_ALLOW_LIST
  ? process.env.CORS_ALLOW_LIST.split(',')
  : [];

const isAllowOrigin = (corsAllowList,url) => corsAllowList.includes(url);

const originCheck = (origin, callback) => {
  if(isAllowOrigin(corsAllowList, origin)) {
    callback(null, true);
  } else {
    callback(new Error('ecmcors error: Not allowed by CORS'));
  }
};

const corsOptions = {
  origin: originCheck,
};

module.exports = cors(corsOptions);
