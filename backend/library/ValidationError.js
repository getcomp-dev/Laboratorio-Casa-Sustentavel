const CustomError = require('./CustomError');

module.exports = function ValidationError(data) {
    CustomError.call(this, 400, 'Validation errors ocurred', data);
};

