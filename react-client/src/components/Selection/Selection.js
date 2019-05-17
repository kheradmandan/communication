import React from 'react';
import {List} from "immutable";
import {Dropdown} from "semantic-ui-react";

export default function ({options, modelName, onSelection, defaultValue}) {

    if (!options) options = [];
    if (List.isList(options)) options = options.toJS();

    let mappedOptions = options
        .filter(x => x[modelName] && x[modelName]['parentId'])
        .map(x => ({key: x[modelName]['id'], value: x[modelName]['id'], text: x[modelName]['title']}));

    return <Dropdown
        openOnFocus
        selection
        options={mappedOptions}
        value={defaultValue}
        name={modelName}
        onChange={onSelection}
    />

}

