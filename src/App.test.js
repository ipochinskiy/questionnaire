import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';

describe('Component: App', () => {
    it('should deeply render without crashing', () => {
        const div = document.createElement('div');
        const dummyStore = createStore(state => ({}));
        const wrappedComponenet = (
            <Provider store={dummyStore}>
                <App />
            </Provider>
        );

        ReactDOM.render(wrappedComponenet, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
