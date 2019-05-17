import React from 'react';
import {Dropdown} from "semantic-ui-react";
import {List} from "immutable";

export default function ({options, modelName}) {

    if (!options) options = [];
    if (List.isList(options)) options = options.toJS();

    let mappedOptions = options
        .filter(x => x[modelName]['parentId'])
        .map(x => ({key: x[modelName]['id'], value: x[modelName]['id'], text: x[modelName]['title']}));

    return <Dropdown
        openOnFocus
        selection
        options={mappedOptions}
    />

}

