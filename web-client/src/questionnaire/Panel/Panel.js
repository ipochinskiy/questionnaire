import React, { Component } from 'react';
import { Multi, Radio, Select, Text, Textarea } from '../../ui-components';
import './Panel.scss';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(key, value) {
        if (this.state && typeof this.state[key] == 'object') {
            this.setState({
                [key]: {
                    ...this.state[key],
                    ...value,
                },
            });
        } else {
            this.setState({
                [key]: value,
            });
        }
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
