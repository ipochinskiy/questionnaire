import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../ui-components';
import { appLoaded, questionnaireSubmitted } from '../actions';
import Panel from '../Panel/Panel';
import './Questionnaire.scss';

export class Questionnaire extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: {},
        };

        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleResetForm = this.handleResetForm.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
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
        questionnaireSubmitted(this.state.answers);
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

    handleValueChange(key, value) {
        if (this.state && this.state.answers && typeof this.state.answers[key] == 'object') {
            this.setState({
                ...this.state.answers,
                answers: {
                    [key]: {
                        ...this.state.answers[key],
                        ...value,
                    },
                },
            });
        } else {
            this.setState({
                answers: {
                    ...this.state.answers,
                    [key]: value,
                },
            });
        }
    }

    render() {
        const { questionList = [] } = this.props;

        const panelList = questionList.map(q => {
            const selectedValue = this.state && this.state.answers[q.key] || null;
            return <Panel
                key={q.key}
                question={q}
                selectedValue={selectedValue}
                handleValueChange={this.handleValueChange}
            />;
        });

        return (
            <form className='Questionnaire' onSubmit={this.handleSubmitForm}>
                {panelList}
                <div className='Questionnaire__hint'>* Pfilchtfeld</div>
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
        questionnaireSubmitted: state => dispatch(questionnaireSubmitted(state)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
