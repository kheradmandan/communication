import React from 'react';
import {Feed,} from "semantic-ui-react";
import LocaleDate from "../LocaleDate";
import AssigneeForm from "../AssigneeForm/AssigneeForm";
import User from "../User";

export default function IssueFeed({comments = [], activeAssignee, onAddComment}) {

    return <Feed>
        {comments.map(comment =>
            <Feed.Event>
                <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/justen.jpg'/>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User><User source={comment.get('user')}/></Feed.User>
                        <Feed.Date><LocaleDate timestamp={comment.getIn(['created', 'at'])}
                                               relative={true}/></Feed.Date>
                    </Feed.Summary>
                    {
                        comment.get('comments').map(comment =>
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
