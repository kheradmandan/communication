/**
 * Safe Async Middleware
 * @param asyncMiddleware
 * @returns {function(*=, *=, *=): Promise<any | never>}
 */
export const safeAsync = asyncMiddleware => (req, res, next) =>
    Promise
        .resolve(asyncMiddleware(req, res, next))
        .catch(next);