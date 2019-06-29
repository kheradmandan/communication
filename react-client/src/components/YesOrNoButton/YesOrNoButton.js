import React from 'react';
import {Button, Grid, Popup} from 'semantic-ui-react';

export default function ({trigger, buttons = []}) {
    return <Popup wide trigger={trigger} on='click'>
        <Grid divided columns='equal'>
            <Grid.Column>
                {buttons.map(
                    ({color = 'blue', position = 'top center', size = 'tiny', content, exp, onClick}) =>
                        <Popup
                            trigger={<Button color={color} content={content} fluid onClick={onClick}/>}
                            content={exp}
                            position={position}
                            size={size}
                            inverted
                        />
                )}
            </Grid.Column>
        </Grid>
    </Popup>
}