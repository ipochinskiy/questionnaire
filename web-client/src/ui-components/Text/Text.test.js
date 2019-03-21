import { shallow } from 'enzyme';
import React from 'react';
import Text from './Text';

describe('Component: Text', () => {
    const SPAGHETTI_TEXT = 'On our own, we are marshmallows and dried spaghetti, but together we can become something bigger';
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render the text input', () => {
        const component = shallow(<Text {...props} />);

        expect(component.find('input')).toExist();
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
                const component = shallow(<Text {...props} />);
                component.find('.Text input').simulate('change', event);
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
