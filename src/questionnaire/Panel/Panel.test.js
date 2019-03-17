import { shallow } from 'enzyme';
import React from 'react';
import Panel from './Panel';

describe('Component: Panel', () => {
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render the question', () => {
        const component = shallow(<Panel {...props} />);

        expect(component).toIncludeText(JSON.stringify(props.question));
    });
});

function createComponentProps(options = {}) {
    return {
        question: {
            key: 'first question',
            text: `what's the meaning of life?`,
        },
    };
}
