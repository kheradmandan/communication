import React from 'react';

export default function ({source, by = ''}) {
    if (!source) {
        return <p>- no - user - </p>
    }
    const gender = source.getIn(['name', 'gender']);
    const first = source.getIn(['name', 'first']);
    const last = source.getIn(['name', 'last']);
    return <p> {`${by} ${gender} ${first} ${last}`}</p>
}
