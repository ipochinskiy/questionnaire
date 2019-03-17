import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appLoaded } from './actions';
import './Questionnaire.scss';

export class Questionnaire extends Component {
    componentDidMount() {
        const { appLoaded } = this.props;
        appLoaded();
    }

    render() {
        return (
            <div className="Questionnaire">
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        appLoaded: () => dispatch(appLoaded()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
