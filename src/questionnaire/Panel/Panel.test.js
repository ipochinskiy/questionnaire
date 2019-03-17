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

        expect(component).toIncludeText(`what's the meaning of life?`);
        expect(component).toIncludeText(`we'll return to this place in exactly seven and a half million years`);
        expect(component).toIncludeText('radio');
    });
});

function createComponentProps(options = {}) {
    return {
        question: {
            key: 'first question',
            type: 'single',
            data: {
                question: `what's the meaning of life?`,
                body: `we'll return to this place in exactly seven and a half million years`,
            },
            isRequired: true,
        },
    };
}
