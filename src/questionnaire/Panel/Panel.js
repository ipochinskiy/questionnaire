import React, { Component } from 'react';
import './Panel.scss';

class Panel extends Component {
    render() {
        const { question: { key, type, data = {}, isRequired } = {} } = this.props;
        const { question, body, answers } = data;

        return (
            <div className='Panel'>
                {question && <div className='Panel__title'>{question}</div>}
                {body && <div className='Panel__description'>{body}</div>}
            </div>
        );
    }
}

export default Panel;
