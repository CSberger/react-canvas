import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import {Gradient, Surface} from '../lib/ReactCanvas'


storiesOf('Gradient', module)
    .add('small', () => {
        const props = {size: {width: 80, height: 80}};
        return (
            <div>
            <Surface top={0} left={0} width={props.size.width} height={props.size.height}>
                <Gradient
                    style={{
                        top: 0,
                        left: 0,
                        width: props.size.width,
                        height: props.size.height
                    }}
                    colorStops={[
                        {color: "transparent", position: 0},
                        {color: "#000", position: 1}
                    ]}
                />
            </Surface>
            </div>
        );
    });

