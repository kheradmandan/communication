import React from 'react';
import {Button, Comment, Feed, Form, TextArea} from "semantic-ui-react";
import LocaleDate from "../LocaleDate";
import AssigneeForm from "../AssigneeForm/AssigneeForm";

export default function IssueFeed({assignees, activeAssignee, onAddComment}) {

    return <Feed>
        {assignees && assignees.map(assignee =>
            <Feed.Event>
                <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/justen.jpg'/>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User>{assignee.get('User').get('fullName')}</Feed.User>
                        <Feed.Date><LocaleDate timestamp={assignee.get('createdAt')} relative={true}/></Feed.Date>
                    </Feed.Summary>
                    {
                        assignee.get('Comments').map(comment =>
                            <Feed.Extra text>
                                {comment.get('context')}
                            </Feed.Extra>
                        )
                    }
                </Feed.Content>
            </Feed.Event>
        )}
        {
            activeAssignee && <AssigneeForm assignee={activeAssignee} onAddComment={onAddComment}/>
        }
    </Feed>;
}
