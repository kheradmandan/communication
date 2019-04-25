import ForbiddenError from "../errors/ForbiddenError";

/**
 * Middleware to protect route
 * @param req
 * @param res
 * @param next
 */
export default function protection(req, res, next) {
    const user = req.user;

    if (!user || !user.uuid) {
        throw new ForbiddenError()
    }
    next();
}