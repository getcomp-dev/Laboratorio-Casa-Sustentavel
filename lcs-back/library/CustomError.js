'use strict';

module.exports = function Exception(status, message, data) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    this.data = data;
};

require('util').inherits(module.exports, Error);