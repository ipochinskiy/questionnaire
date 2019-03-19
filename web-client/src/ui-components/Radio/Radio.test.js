import { shallow } from 'enzyme';
import React from 'react';
import Radio from './Radio';

describe('Component: Radio', () => {
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render all the options', () => {
        const component = shallow(<Radio {...props} />);
        const radioItemList = component.find('.Radio__item');

        expect(radioItemList.at(0)).toIncludeText('Iron Man');
        expect(radioItemList.at(0).find('input').props()).toMatchObject({
            type: 'radio',
            name: 'avengers',
            checked: true,
        });
        expect(radioItemList.at(1)).toIncludeText('Captain America');
        expect(radioItemList.at(1).find('input').props()).toMatchObject({
            type: 'radio',
            name: 'avengers',
            checked: false,
        });
    });

    describe('after a value getting checked', () => {
        beforeEach(() => {
            const component = shallow(<Radio {...props} />);
            component.find('.Radio__item').at(1).find('input').simulate('change', {});
        });

        it('should call "handleSelect', () => {

            expect(props.handleSelect).toHaveBeenCalledWith('cap');
        });
    });
});

function createComponentProps(options = {}) {
    return {
        group: 'avengers',
        itemList: [
            { value: 'iman', label: 'Iron Man' },
            { value: 'cap', label: 'Captain America' },
        ],
        selectedValue: 'iman',
        handleSelect: jest.fn(),
        ...options,
    };
}
