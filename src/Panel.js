import React, { Component } from 'react';
import './Panel.scss';

class Panel extends Component {
    render() {
        const { question = {} } = this.props;
        return (
            <pre className="Panel">
                {JSON.stringify(question)}
            </pre>
        );
    }
}

export default Panel;
