import { shallow } from 'enzyme';
import React from 'react';
import Select from './Select';

describe('Component: Select', () => {
    let props;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render the select box', () => {
        const component = shallow(<Select {...props} />);

        expect(component.find('.Select').props()).toMatchObject({
            name: 'avengers',
            defaultValue: 'default',
        });
    });

    it('should render all the options', () => {
        const component = shallow(<Select {...props} />);
        const optionList = component.find('.Select option');

        expect(optionList.at(0)).toIncludeText('Wähle aus');
        expect(optionList.at(0).props()).toMatchObject({
            value: 'default',
        });
        expect(optionList.at(1)).toIncludeText('Iron Man');
        expect(optionList.at(1).props()).toMatchObject({
            value: 'Iron Man',
        });
        expect(optionList.at(2)).toIncludeText('Captain America');
        expect(optionList.at(2).props()).toMatchObject({
            value: 'Captain America',
        });
    });

    describe('after a value getting selected', () => {
        beforeEach(() => {
            const component = shallow(<Select {...props} />);
            component.find('.Select').at(0).simulate('change', {
                target: {
                    value: 'Captain America',
                },
            });
        });

        it('should call "handleSelect', () => {

            expect(props.handleSelect).toHaveBeenCalledWith('Captain America');
        });
    });
});

function createComponentProps(options = {}) {
    return {
        name: 'avengers',
        valueList: [
            'Iron Man',
            'Captain America',
        ],
        selectedValue: 'Iron Man',
        handleSelect: jest.fn(),
        ...options,
    };
}
