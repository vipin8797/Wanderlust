/**
 * Custom operational error class for Express applications.
 * Inherits from standard JavaScript Error to capture stack traces.
 */
class ExpressError extends Error {
    /**
     * @param {number} status - The HTTP status code (e.g. 404, 500)
     * @param {string} message - The error explanation message
     */
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExpressError;