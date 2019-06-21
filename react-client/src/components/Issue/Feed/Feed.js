import React from 'react';
import propTypes from 'prop-types';
import {Map} from 'immutable';
import {Feed} from 'semantic-ui-react';
import LocaleDate from '../../LocaleDate';
import AddComment from '../AddComment';
import Ability from '../../Ability';
import User from '../../User';

export default function ({issue, onAddComment}) {

    return <Feed>
        <Ability can='add-comment-to-issue'>
            < AddComment issueId={issue.get('_id')} onAddComment={onAddComment}/>
        </Ability>
        {issue.get('comments').map(comment =>
            <Feed.Event>
                <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/justen.jpg'/>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User><User source={comment.getIn(['created', 'by'])}/></Feed.User>
                        <Feed.Date><LocaleDate timestamp={comment.getIn(['created', 'at'])}
                                               relative={true}/></Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {comment.get('context')}
                    </Feed.Extra>

                </Feed.Content>
            </Feed.Event>
        )}
    </Feed>;
}

Feed.propTypes = {
    issue: propTypes.instanceOf(Map).isRequired,
};

Feed.defaultTypes = {
    issue: Map({})
};
