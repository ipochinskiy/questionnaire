import { shallow } from 'enzyme';
import React from 'react';
import Button from './Button';

describe('Component: Button', () => {
    it('should render button of the correct shape', () => {
        const component = shallow(<Button shape='primary' />);

        expect(component.find('button.Button--primary').first()).toBeTruthy();
    });

    it('should render children', () => {
        const component = shallow(<Button shape='primary'>a tiny pretty button</Button>);

        expect(component).toIncludeText('a tiny pretty button');
    });

    it('should pass the rest of the props over to the button', () => {
        const component = shallow(<Button shape='primary' type='reset' foo='bar'>a tiny pretty button</Button>);

        expect(component.find('button').props()).toMatchObject({
            type: 'reset',
            foo: 'bar',
        });
    });
});
