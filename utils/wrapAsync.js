/**
 * Asynchronous route handler wrapper that automatically catches
 * unresolved promises and forwards errors to the next middleware.
 * 
 * @param {Function} fn - The asynchronous Express route/middleware handler function
 * @returns {Function} Express middleware function
 */
function wrapAsync(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = wrapAsync;
