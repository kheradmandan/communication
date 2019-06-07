import React from 'react';

export default function ({source}) {
    if (!source) {
        return <p>- no - user - </p>
    }

    let {gender, first, last} = source.name;
    return <p> {`${gender} ${first} ${last}`}</p>
}
