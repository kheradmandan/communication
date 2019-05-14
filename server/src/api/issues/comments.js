import {User, Assignee, Comment} from '../../models';
import FieldMissingError from "../../errors/FieldMissingError";
import ForbiddenError from "../../errors/ForbiddenError";
import {safeAsync} from "../../core/safe-async-middleware";

export const addComment = safeAsync(async function (req, res, next) {
    const currentUser = req.user;
    const {assigneeUuid} = req.params;
    const {context} = req.body;
    if (!context) {
        throw new FieldMissingError().appendMessage(['context'])
    }

    // insurance
    const [assignee, user] = await Promise.all([
        Assignee.findByPk(assigneeUuid, {rejectOnEmpty: true}),
        User.findByPk(currentUser.uuid, {rejectOnEmpty: true})
    ]);

    // permission
    if (assignee.userUuid !== user.uuid) {
        throw new ForbiddenError().appendMessage('Assignee is not belong to you.');
    }

    // create
    const createdComment = await Comment.create({
        assigneeUuid: assignee.uuid,
        context,
        createdBy: user.uuid
    });

    // passed
    res.locals.payload = await createdComment.get();
    next();
});