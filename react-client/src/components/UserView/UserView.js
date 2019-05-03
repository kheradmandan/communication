import React from 'react';

export default function ({user={}, by = 'توسط '}) {
    return <a>{by} {user.fullName}</a>
}