import React from 'react';

export default function ({source}) {
    if (!source) {
        return <p>- no - user - </p>
    }
    const gender = source.getIn(['name', 'gender']);
    const first = source.getIn(['name', 'first']);
    const last = source.getIn(['name', 'last']);
    return <p> {`${gender} ${first} ${last}`}</p>
}
