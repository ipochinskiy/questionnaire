import { shallow } from 'enzyme';
import React from 'react';
import { Questionnaire } from './Questionnaire';

describe('Component: Questionnaire', () => {
    let props;

    beforeEach(() => {
        props = createComponentProps({
            questionList: [
                { key: 'first question' },
                { key: 'second one' },
            ],
        });
    });

    it('should dispatch "appLoaded"', () => {
        shallow(<Questionnaire {...props} />);

        expect(props.appLoaded).toHaveBeenCalled();
    });

    it('should render two question panels', () => {
        const component = shallow(<Questionnaire {...props} />);

        expect(component.find('Panel').at(0).props()).toMatchObject({
            question: { key: 'first question' },
        });
        expect(component.find('Panel').at(1).props()).toMatchObject({
            question: { key: 'second one' },
        });
    });
});

function createComponentProps(options = {}) {
    return {
        appLoaded: jest.fn(),
        ...options,
    };
}
