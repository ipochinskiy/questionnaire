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
            isFormValid: false,
        };

        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleResetForm = this.handleResetForm.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
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
        if (this.state && this.state.answers && typeof this.state.answers[key] === 'object') {
            this.setState({
                ...this.state.answers,
                answers: {
                    [key]: {
                        ...this.state.answers[key],
                        ...value,
                    },
                },
            }, () => {
                this.setState({
                    isFormValid: this.isFormValid(),
                });
            });
        } else {
            this.setState({
                answers: {
                    ...this.state.answers,
                    [key]: value,
                },
            }, () => {
                this.setState({
                    isFormValid: this.isFormValid(),
                });
            });
        }
    }

    isFormValid() {
        const { questionList = [] } = this.props;
        const { answers: formData = {} } = this.state;

        return questionList.reduce((memo, { key, type, data, isRequired }) => {
            let isValid = false;
            if (type === 'multiple') {
                isValid = data.answers.reduce((memo, { key: optionKey }) => {
                    return memo && formData[key] && formData[key][optionKey] !== undefined;
                }, true);
            } else if (type === 'text' || type === 'textarea') {
                isValid = !isRequired || !!formData[key];
            } else {
                isValid = !isRequired || formData[key] !== undefined;
            }
            return memo && isValid;
        }, true);
    }

    render() {
        const { questionList = [] } = this.props;
        const { isFormValid } = this.state;

        const panelList = questionList.map(q => {
            let selectedValue = null;
            // eslint-disable-next-line
            if (this.state && this.state.answers && this.state.answers[q.key] != undefined) {
                selectedValue = this.state.answers[q.key];
            }

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
                    <Button shape='primary' type='submit' disabled={!isFormValid}>Submit</Button>
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
