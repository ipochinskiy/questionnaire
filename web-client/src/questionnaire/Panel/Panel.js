import React, { Component } from 'react';
import { Multi, Radio, Select, Text, Textarea } from '../../ui-components';
import './Panel.scss';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(key, value) {
        const { handleValueChange } = this.props;
        handleValueChange(key, value);
    }

    render() {
        const { question: { key, type, data = {}, isRequired } = {}, selectedValue } = this.props;
        const { question, body, answers } = data;

        let control;
        switch (type) {
            case 'single':
                control = <Radio
                    group={key}
                    itemList={answers}
                    selectedValue={selectedValue}
                    handleSelect={value => this.handleValueChange(key, value)}
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
                control = <Multi
                    itemList={answers}
                    selectedValue={selectedValue}
                    handleSelect={value => this.handleValueChange(key, value)}
                />;
                break;
            case 'textarea':
                control = <Textarea
                    handleChange={value => this.handleValueChange(key, value)}
                />;
                break;
            case 'text':
                control = <Text
                    handleChange={value => this.handleValueChange(key, value)}
                />;
                break;

            default:
                break;
        }

        if (!control) {
            return null;
        }

        const requiredHint = isRequired ? '*\u00A0' : '';           // \u00A0 === &nbsp; – non-breaking space

        return (
            <div className='Panel'>
                <div className='Panel__title'>
                    {requiredHint && <span className='Panel__title__hint'>{requiredHint}</span>}
                    {question}
                </div>
                {body && <div className='Panel__description'>{body}</div>}
                <div className='Panel__type'>
                    {control}
                </div>
            </div>
        );
    }
}

export default Panel;
