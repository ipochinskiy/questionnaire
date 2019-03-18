import { shallow } from 'enzyme';
import React from 'react';
import Panel from './Panel';

describe('Component: Panel', () => {
    let props;

    [
        [
            'with a question of type "single"',
            'should render all the radio options',
            { question: createRadioQuestion() },
            component => expect(component.find('Radio').at(0).props()).toMatchObject({
                group: 'single question',
                selectedValue: null,
                itemList: [
                    { value: 'iman', label: 'Iron Man' },
                    { value: 'cap', label: 'Captain America' },
                    { value: 'thor', label: 'Thor' },
                ],
            }),
            component => component.find('Radio').at(0).prop('handleSelect')('cap'),
            component => expect(component).toHaveState({
                'single question': 'cap',
            }),
        ],
        [
            'with a question of type "select"',
            'should render all the select options',
            { question: createSelectQuestion() },
            component => expect(component.find('Select').at(0).props()).toMatchObject({
                name: 'select question',
                valueList: [ 'Iron Man', 'Captain America', 'Thor' ],
            }),
            component => component.find('Select').at(0).prop('handleSelect')('Thor'),
            component => expect(component).toHaveState({
                'select question': 'Thor',
            }),
        ],
        [
            'with a question of type "multiple"',
            'should render all the multiple options',
            { question: createMultiQuestion() },
            component => expect(component).toIncludeText('multiple'),
        ],
        [
            'with a question of type "textarea"',
            'should render all the textarea options',
            { question: createTextareaQuestion() },
            component => expect(component).toIncludeText('textarea'),
        ],
        [
            'with a question of type "text"',
            'should render all the text options',
            { question: createTextQuestion() },
            component => expect(component).toIncludeText('text'),
        ],
    ].forEach(([ description, assumption, props, checkRender, changeValue, checkState ]) => {
        describe(description, () => {
            let component;

            beforeEach(() => {
                component = shallow(<Panel {...props} />);
            });

            it(assumption, () => {

                expect(component).toIncludeText(`Which Avanger is the best?`);
                expect(component).toIncludeText(`Choose wise, there's no way back`);
                checkRender(component);
            });

            changeValue && describe('after value change is triggered', () => {
                beforeEach(() => {
                    changeValue(component);
                });

                it(`should update the component's state`, () => {

                    checkState(component);
                });
            });
        });
    });
});

function createRadioQuestion(options = {}) {
    return {
        key: 'single question',
        type: 'single',
        data: {
            question: 'Which Avanger is the best?',
            body: `Choose wise, there's no way back`,
            answers: [
                { value: 'iman', label: 'Iron Man' },
                { value: 'cap', label: 'Captain America' },
                { value: 'thor', label: 'Thor' },
            ],
        },
        isRequired: true,
        ...options,
    };
}

function createSelectQuestion(options = {}) {
    return {
        key: 'select question',
        type: 'select',
        data: {
            question: 'Which Avanger is the best?',
            body: `Choose wise, there's no way back`,
            answers: [ 'Iron Man', 'Captain America', 'Thor' ],
        },
        isRequired: true,
        ...options,
    };
}

function createMultiQuestion(options = {}) {
    return {
        key: 'multiple question',
        type: 'multiple',
        data: {
            question: 'Which Avanger is the best?',
            body: `Choose wise, there's no way back`,
            answers: [
                {
                    "key": "the_strongest",
                    "label": "Rate the strength",
                    "options": [
                        {
                            "label": "Iron Man",
                            "value": "iman"
                        },
                        {
                            "label": "Captain America",
                            "value": "cap"
                        },
                        {
                            "label": "Thor",
                            "value": "thor"
                        },
                    ],
                },
                {
                    "key": "the_smartest",
                    "label": "Rate intelligence",
                    "options": [
                        {
                            "label": "Iron Man",
                            "value": "iman"
                        },
                        {
                            "label": "Captain America",
                            "value": "cap"
                        },
                        {
                            "label": "Thor",
                            "value": "thor"
                        },
                    ],
                },
            ],
        },
        isRequired: true,
        ...options,
    };
}

function createTextareaQuestion(options = {}) {
    return {
        key: 'textarea question',
        type: 'textarea',
        data: {
            question: 'Which Avanger is the best?',
            body: `Choose wise, there's no way back`,
        },
        isRequired: true,
        ...options,
    };
}

function createTextQuestion(options = {}) {
    return {
        key: 'text question',
        type: 'text',
        data: {
            question: 'Which Avanger is the best?',
            body: `Choose wise, there's no way back`,
        },
        isRequired: true,
        ...options,
    };
}
