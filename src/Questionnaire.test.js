import { shallow } from 'enzyme';
import React from 'react';
import { Questionnaire } from './Questionnaire';

describe('Component: Questionnaire', () => {
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should dispatch "appLoaded"', () => {
        shallow(<Questionnaire {...props} />);

        expect(props.appLoaded).toHaveBeenCalled();
    });
});

function createComponentProps(options = {}) {
    return {
        appLoaded: jest.fn(),
        ...options,
    };
}
