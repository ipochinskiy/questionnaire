import React, { Component } from 'react';
import { Radio, Select } from '../../ui-components';
import './Panel.scss';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(key, value) {
        this.setState({
            [key]: value,
        });
    }

    render() {
        const { question: { key, type, data = {}, isRequired } = {} } = this.props;
        const { question, body, answers } = data;
        const selectedValue = this.state && this.state[key];

        let control;
        switch (type) {
            case 'single':
                control = <Radio
                    group={key}
                    itemList={answers}
                    selectedValue={selectedValue}
                    handleSelect={(value) => this.handleValueChange(key, value)}
                />;
                break;
            case 'select':
                control = <Select
                    name={key}
                    valueList={answers}
                    handleSelect={value => this.handleValueChange(key, value)}
                />;
                break;
            case 'multiple':
                control = 'multiple';
                break;
            case 'textarea':
                control = 'textarea';
                break;
            case 'text':
                control = 'text';
                break;

            default:
                break;
        }

        if (!control) {
            return null;
        }

        return (
            <div className='Panel'>
                {question && <div className='Panel__title'>{question}</div>}
                {body && <div className='Panel__description'>{body}</div>}
                <div className='Panel__type'>
                    {control}
                </div>
            </div>
        );
    }
}

export default Panel;
