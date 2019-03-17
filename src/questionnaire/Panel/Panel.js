import React, { Component } from 'react';
import './Panel.scss';

class Panel extends Component {
    render() {
        const { question: { key, type, data = {}, isRequired } = {} } = this.props;
        const { question, body, answers } = data;
        let control;
        switch (type) {
            case 'single':
                control = 'radio';
                break;
            case 'select':
                control = 'select';
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
