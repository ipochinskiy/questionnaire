import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../ui-components';
import { appLoaded, questionnaireSubmitted } from '../actions';
import Panel from '../Panel/Panel';
import './Questionnaire.scss';

export class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleResetForm = this.handleResetForm.bind(this);
    }

    componentDidMount() {
        const { appLoaded } = this.props;
        appLoaded();
    }

    handleSubmitForm(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const { questionnaireSubmitted } = this.props;
        questionnaireSubmitted(this.state);
    }

    handleResetForm(event) {
        if (!event) {
            return;
        }

        if (event.preventDefault) {
            event.preventDefault();
        }

        if (event.target && event.target.form && event.target.form.reset) {
            event.target.form.reset();
        }
    }

    render() {
        const { questionList = [] } = this.props;
        return (
            <form className='Questionnaire' onSubmit={this.handleSubmitForm}>
                {questionList.map(q =>
                    <Panel key={q.key} question={q} />
                )}
                <div className='Questionnaire__buttons'>
                    <Button shape='primary' type='submit'>Submit</Button>
                    <Button shape='neutral' type='reset' onClick={this.handleResetForm}>Reset</Button>
                </div>
            </form>
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
        questionnaireSubmitted: () => dispatch(questionnaireSubmitted()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
