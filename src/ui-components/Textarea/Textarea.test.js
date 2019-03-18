import { shallow } from 'enzyme';
import React from 'react';
import Textarea from './Textarea';

describe('Component: Textarea', () => {
    const SPAGHETTI_TEXT = 'On our own, we are marshmallows and dried spaghetti, but together we can become something bigger';
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render the textarea', () => {
        const component = shallow(<Textarea {...props} />);

        expect(component.find('textarea')).toExist();
    });

    [
        [
            'after a change event is fired with a changed value',
            'should call "handleChange" with this value',
            { target: { value: SPAGHETTI_TEXT } },
            SPAGHETTI_TEXT,
        ],
        [
            'after a change event is fired without "target"',
            'should call "handleChange" with the default value',
            { target: undefined },
            null,
        ],
        [
            'after a falsy event is fired',
            'should call "handleChange" with the default value',
            undefined,
            null,
        ],
    ].forEach(([description, assertion, event, expectedValue ]) => {
        describe(description, () => {
            beforeEach(() => {
                const component = shallow(<Textarea {...props} />);
                component.find('.Textarea textarea').simulate('change', event);
            });

            it(assertion, () => {

                expect(props.handleChange).toHaveBeenCalledWith(expectedValue);
            });
        });
    });
});

function createComponentProps(options = {}) {
    return {
        handleChange: jest.fn(),
        ...options,
    };
}
