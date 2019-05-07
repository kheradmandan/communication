import {User, Assignee, Comment} from '../../models';
import response from '../../core/response';
import FieldMissingError from "../../errors/FieldMissingError";
import ForbiddenError from "../../errors/ForbiddenError";

export function addComment(req, res, next) {
    const currentUser = req.user;
    const {assigneeUuid} = req.params;
    const {context} = req.body;
    if (!context) {
        throw new FieldMissingError().appendMessage(['context'])
    }

    Promise.all(
        [
            Assignee.findByPk(assigneeUuid, {rejectOnEmpty: true}),
            User.findByPk(currentUser.uuid, {rejectOnEmpty: true})
        ])
        .then(function ([assignee, user]) {
            if (assignee.userUuid !== user.uuid) {
                throw new ForbiddenError().appendMessage('Assignee is not belong to you.');
            }
            return Comment
                .create({
                    assigneeUuid: assignee.uuid,
                    context,
                    createdBy: user.uuid
                })
        })
        .then(comment=>comment.get())
        .then(response(req, res, next))
        .catch(next);
}