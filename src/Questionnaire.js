import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appLoaded } from './actions';
import Panel from './Panel';
import './Questionnaire.scss';

export class Questionnaire extends Component {
    componentDidMount() {
        const { appLoaded } = this.props;
        appLoaded();
    }

    render() {
        const { questionList = [] } = this.props;
        return (
            <div className='Questionnaire'>
                {questionList.map(q =>
                    <Panel key={q.key} question={q} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        questionList: state.questionList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        appLoaded: () => dispatch(appLoaded()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
