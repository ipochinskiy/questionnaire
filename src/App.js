import React, { Component } from 'react';
import './App.scss';
import { Questionnaire } from './questionnaire';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Questionnaire />
            </div>
        );
    }
}

export default App;
