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

        expect(props.appLoaded).toHaveBeenCalledTimes(1);
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

    it('should render a submit button', () => {
        const component = shallow(<Questionnaire {...props} />);

        expect(component.find('Button').at(0).props()).toMatchObject({
            shape: 'primary',
            type: 'submit',
            children: 'Submit',
        });
    });

    describe('after submitting the form', () => {
        let component;

        beforeEach(() => {
            component = shallow(<Questionnaire {...props} />);
            component.find('form').simulate('submit', {
                preventDefault: jest.fn(),
            });
        });

        it(`should dispatch "questionnaireSubmitted"`, () => {
            shallow(<Questionnaire {...props} />);

            expect(props.questionnaireSubmitted).toHaveBeenCalledTimes(1);
        });
    });

    it('should render a reset button', () => {
        const component = shallow(<Questionnaire {...props} />);

        expect(component.find('Button').at(1).props()).toMatchObject({
            shape: 'neutral',
            type: 'reset',
            children: 'Reset',
        });
    });

    describe('after click on the reset button', () => {
        let component;
        let clickEvent;

        describe('with event containing both "preventDefault" and "target.form.reset"', () => {
            beforeEach(() => {
                component = shallow(<Questionnaire {...props} />);
                clickEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        form: {
                            reset: jest.fn(),
                        },
                    },
                };
                component.find('Button').at(1).simulate('click', clickEvent);
            });

            it('should prevent default behavior for the event', () => {

                expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
            });

            it('should call "reset" on the form node', () => {

                expect(clickEvent.target.form.reset).toHaveBeenCalledTimes(1);
            });
        });

        describe('with event containing no "preventDefault"', () => {
            beforeEach(() => {
                component = shallow(<Questionnaire {...props} />);
                clickEvent = {
                    target: {
                        form: {
                            reset: jest.fn(),
                        },
                    },
                };
                component.find('Button').at(1).simulate('click', clickEvent);
            });

            it('should call "reset" on the form node', () => {

                expect(clickEvent.target.form.reset).toHaveBeenCalledTimes(1);
            });
        });

        describe('with event containing no "target.form.reset"', () => {
            beforeEach(() => {
                component = shallow(<Questionnaire {...props} />);
                clickEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        form: {
                        },
                    },
                };
                component.find('Button').at(1).simulate('click', clickEvent);
            });

            it('should prevent default behavior for the event', () => {

                expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
            });
        });

        describe('with event containing no "target.form"', () => {
            beforeEach(() => {
                component = shallow(<Questionnaire {...props} />);
                clickEvent = {
                    preventDefault: jest.fn(),
                    target: {
                    },
                };
                component.find('Button').at(1).simulate('click', clickEvent);
            });

            it('should prevent default behavior for the event', () => {

                expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
            });
        });

        describe('with event containing no "target"', () => {
            beforeEach(() => {
                component = shallow(<Questionnaire {...props} />);
                clickEvent = {
                    preventDefault: jest.fn(),
                };
                component.find('Button').at(1).simulate('click', clickEvent);
            });

            it('should prevent default behavior for the event', () => {

                expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
            });
        });
    });
});

function createComponentProps(options = {}) {
    return {
        appLoaded: jest.fn(),
        questionnaireSubmitted: jest.fn(),
        ...options,
    };
}
