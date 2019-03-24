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

        expect(props.appLoaded).toHaveBeenCalledTimes(1);
    });

    it('should render two question panels', () => {
        const component = shallow(<Questionnaire {...props} />);

        expect(component.find('Panel').at(0).props()).toMatchObject({
            question: { key: 'first question' },
            selectedValue: null,
        });
        expect(component.find('Panel').at(1).props()).toMatchObject({
            question: { key: 'second one' },
            selectedValue: null,
        });
    });

    describe('with some questions having selected values in the state', () => {
        let component;

        beforeEach(() => {
            component = shallow(<Questionnaire {...props} />);
            component.setState({
                answers: {
                    'first question': '42',
                    'second one': false,
                },
            });
        });

        it('should set those values as "selectedValue" on the panels', () => {

            expect(component.find('Panel').at(0).props()).toMatchObject({
                question: { key: 'first question' },
                selectedValue: '42',
            });
            expect(component.find('Panel').at(1).props()).toMatchObject({
                question: { key: 'second one' },
                selectedValue: false,
            });
        });
    });

    describe('after a panel sets an object-value for a key', () => {
        let component;

        beforeEach(() => {
            component = shallow(<Questionnaire {...props} />);
            component.find('Panel').at(0).prop('handleValueChange')('best_avenger', {
                'the_smartest': 'iman',
            });
        });

        it('should set the state to this value', () => {

            expect(component).toHaveState({
                answers: {
                    'best_avenger': {
                        'the_smartest': 'iman',
                    },
                },
            });
        });

        describe('and after a panel amends the object-value for the same key', () => {
            beforeEach(() => {
                component.find('Panel').at(0).prop('handleValueChange')('best_avenger', {
                    'the_strongest': 'hulk',
                });
            });

            it('should amend the state and keep previous info', () => {

                expect(component).toHaveState({
                    answers: {
                        'best_avenger': {
                            'the_smartest': 'iman',
                            'the_strongest': 'hulk',
                        },
                    },
                });
            });
        });
    });

    it('should render a hint for mandatory fields', () => {
        const component = shallow(<Questionnaire {...props} />);

        expect(component).toIncludeText('* Pfilchtfeld');
    });

    it('should render a disabled submit button', () => {
        const component = shallow(<Questionnaire {...props} />);

        expect(component.find('Button').at(0).props()).toMatchObject({
            shape: 'primary',
            type: 'submit',
            disabled: true,
            children: 'Submit',
        });
    });

    describe('with a few mandatory and optional questions of type "single"', () => {
        let component;

        beforeEach(() => {
            props = createComponentProps({
                questionList: [
                    { key: 'mandatory single question', type: 'single', isRequired: true },
                    { key: 'optional single question', type: 'single', isRequired: false },
                ],
            });
            component = shallow(<Questionnaire {...props} />);
        });

        describe('after a mandatory question of type "single" gets filled out', () => {
            beforeEach(() => {
                component.find('Panel').at(0).prop('handleValueChange')('mandatory single question', 'some value');
            });

            it('should render the submit button enabled', () => {

                expect(component.find('Button').at(0).props()).toMatchObject({
                    shape: 'primary',
                    type: 'submit',
                    disabled: false,
                    children: 'Submit',
                });
            });

            describe('and after submitting the form', () => {
                beforeEach(() => {
                    component.find('form').simulate('submit', {
                        preventDefault: jest.fn(),
                    });
                });

                it(`should dispatch "questionnaireSubmitted" with the current component's state`, () => {

                    expect(props.questionnaireSubmitted).toHaveBeenCalledTimes(1);
                    expect(props.questionnaireSubmitted).toHaveBeenCalledWith({
                        'mandatory single question': 'some value',
                    });
                });
            });
        });

        describe('after an optional question of type "single" gets filled out', () => {
            beforeEach(() => {
                component.find('Panel').at(1).prop('handleValueChange')('optional single question', 'some value');
            });

            it('should render a disabled submit button', () => {
                const component = shallow(<Questionnaire {...props} />);

                expect(component.find('Button').at(0).props()).toMatchObject({
                    shape: 'primary',
                    type: 'submit',
                    disabled: true,
                    children: 'Submit',
                });
            });
        });
    });

    describe('with a mandatory question of type "multiple"', () => {
        let component;

        beforeEach(() => {
            props = createComponentProps({
                questionList: [
                    {
                        key: 'mandatory multiple question',
                        type: 'multiple',
                        isRequired: true,
                        data: {
                            answers: [
                                { key: 'first part' },
                                { key: 'second part' },
                            ],
                        },
                    },
                ],
            });
            component = shallow(<Questionnaire {...props} />);
        });

        describe('after the first part of the question gets filled out', () => {
            beforeEach(() => {
                component.find('Panel').at(0).prop('handleValueChange')('mandatory multiple question', {
                    'first part': 'some value',
                });
            });

            it('should render a disabled submit button', () => {

                expect(component.find('Button').at(0).props()).toMatchObject({
                    shape: 'primary',
                    type: 'submit',
                    disabled: true,
                    children: 'Submit',
                });
            });

            describe('and after the last part of the question gets filled out', () => {
                beforeEach(() => {
                    component.find('Panel').at(0).prop('handleValueChange')('mandatory multiple question', {
                        'second part': false,
                    });
                });

                it('should render a disabled submit button', () => {

                    expect(component.find('Button').at(0).props()).toMatchObject({
                        shape: 'primary',
                        type: 'submit',
                        disabled: false,
                        children: 'Submit',
                    });
                });
            });
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
        questionList: [
            { key: 'first question' },
            { key: 'second one' },
        ],
        appLoaded: jest.fn(),
        questionnaireSubmitted: jest.fn(),
        ...options,
    };
}
