const EventEmitter = require('events');
const { expect } = require('chai');

describe('ecmcors', () => {
  const errorMessage = 'Not allowed by CORS';

  const fakeRequest = (method, headers) => {
    return new FakeRequest(method, headers);
  };

  const fakeResponse = () => {
    return new FakeResponse();
  };

  describe('GET request', () => {
    const requestMethod = 'GET';

    describe('Not set CORS_ALLOW_LIST', () => {
      beforeEach(() => {
        process.env.CORS_ALLOW_LIST = '';
      });

      it("Don't set the environment variables, all origins are not allowed.", (done) => {
        const ecmcors = require('../index');

        const req = fakeRequest(requestMethod);
        const res = fakeResponse();

        ecmcors(req, res, (error) => {
          expect(error.toString()).to.include(errorMessage);
          done();
        });
      });
    });

    describe('Set CORS_ALLOW_LIST (http://example.com)', () => {
      beforeEach(() => {
        process.env.CORS_ALLOW_LIST = 'http://example.com';
      });

      it('Only authorized origin will be allowed to pass. (http://example.com)', (done) => {
        const ecmcors = require('../index');

        const req = fakeRequest(requestMethod);
        const res = fakeResponse();

        ecmcors(req, res, (error) => {
          expect(error).to.be.undefined;
          done();
        });
      });

      it('Only authorized origin will be allowed to pass. (http://example.net is not allowed)', (done) => {
        const ecmcors = require('../index');

        const req = fakeRequest(requestMethod, {
          origin: 'http://example.net',
        });
        const res = fakeResponse();

        ecmcors(req, res, (error) => {
          expect(error.toString()).to.include(errorMessage);
          done();
        });
      });
    });

    describe('Set multi origin CORS_ALLOW_LIST (http://example.com, http://example.net)', () => {
      beforeEach(() => {
        process.env.CORS_ALLOW_LIST = 'http://example.com,http://example.net';
      });

      it('Only authorized origin will be allowed to pass. (http://example.com)', (done) => {
        const ecmcors = require('../index');

        const req = fakeRequest(requestMethod);
        const res = fakeResponse();

        ecmcors(req, res, (error) => {
          expect(error).to.be.undefined;
          done();
        });
      });

      it('Only authorized origin will be allowed to pass. (http://example.net)', (done) => {
        const ecmcors = require('../index');

        const req = fakeRequest(requestMethod, {
          origin: 'http://example.net',
        });
        const res = fakeResponse();

        ecmcors(req, res, (error) => {
          expect(error).to.be.undefined;
          done();
        });
      });

      it('Only authorized origin will be allowed to pass. (http://example.org is not allowed)', (done) => {
        const ecmcors = require('../index');

        const req = fakeRequest(requestMethod, {
          origin: 'http://example.org',
        });
        const res = fakeResponse();

        ecmcors(req, res, (error) => {
          expect(error.toString()).to.include(errorMessage);
          done();
        });
      });
    });
  });
});

class FakeRequest {
  constructor(method, headers) {
    this.headers = headers || {
      origin: 'http://example.com',
    };

    this.method = method || 'GET';
  }
}

class FakeResponse extends EventEmitter {
  constructor() {
    super();

    this._headers = {};
    this.statusCode = 200;
  }

  end() {
    const response = this;

    process.nextTick(() => {
      response.emit('finish');
    });
  }

  getHeader(name) {
    const key = name.toLowerCase;
    return this._headers[key];
  }

  setHeader(name, value) {
    const key = name.toLowerCase();
    this._headers[key] = value;
  }
}
