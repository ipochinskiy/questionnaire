import { shallow } from 'enzyme';
import React from 'react';
import Multi from './Multi';

describe('Component: Multi', () => {
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render all the option groups', () => {
        const component = shallow(<Multi {...props} />);
        const itemList = component.find('.Multi__item');

        expect(itemList.at(0)).toIncludeText('Rate the strength');
        expect(itemList.at(0).find('Radio').props()).toMatchObject({
            group: 'the_strongest',
            itemList: [
                {
                    "label": "Iron Man",
                    "value": "iman",
                },
                {
                    "label": "Captain America",
                    "value": "cap",
                },
                {
                    "label": "Thor",
                    "value": "thor",
                },
            ],
            selectedValue: 'thor',
        });
    });

    describe('when rendered without "selectedValue"', () => {
        beforeEach(() => {
            props = createComponentProps({
                selectedValue: null,
            })
        });

        it('should set "selectedValue" for the Radio to the default value (null)', () => {
            const component = shallow(<Multi {...props} />);
            const itemList = component.find('.Multi__item');

            expect(itemList.at(0)).toIncludeText('Rate the strength');
            expect(itemList.at(0).find('Radio').props()).toMatchObject({
                selectedValue: null,
            });
        });
    });

    describe('after a group value getting selected', () => {
        beforeEach(() => {
            const component = shallow(<Multi {...props} />);
            component.find('Radio').at(0).prop('handleSelect')('cap');
        });

        it('should call "handleSelect', () => {

            expect(props.handleSelect).toHaveBeenCalledWith({ 'the_strongest': 'cap' });
        });
    });
});

function createComponentProps(options = {}) {
    return {
        name: 'avengers',
        itemList: [
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
        ],
        selectedValue: {
            'the_strongest': 'thor',
        },
        handleSelect: jest.fn(),
        ...options,
    };
}
