import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {addSurvey,addSurveyDay} from '../actions';
import 'react-widgets/dist/css/react-widgets.css';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Calendar } from 'react-widgets';

Moment.locale('fr');
momentLocalizer();
class SurveyForm extends Component {
  constructor(props){
    super(props);

    this.state = {subject_number:this.props.match.params.subject_number};

  }


  submitForm(values){

    //e.preventDefault();
    console.log(values);
  //  this.props.addSurvey(this.state.subject_number,values);
  }

  renderField(field){
    return (
      <div className="input-field col s6">
      <input type="text" {...field.input} {...field.rest}/>
      <label htmlFor="last_name">{field.label}</label>
      {field.meta.error}
      </div>
    );
  }
  renderDatePicker(field){
    const {input, placeholder, defaultValue,rest, meta: {touched, error} }  = field;
    debugger;
    return (<div>
          <DatePicker {...input} {...rest} dateFormat="DD/MM/YYYY" selected={defaultValue} />
          {touched && error && <span>{error}</span>}
    </div>);
  };

  handleChange(date) {
    console.log(date);
    debugger;
    this.setState({dateToAdd:date});
    this.props.addSurveyDay(date.format('YYYY-MM-DD'));

  }

  newDiary(date){
    this.props.addSurveyDay(date);
    console.log(date);
  }
  renderDayList(){

    return this.props.survey.days.map((item)=>{
      return (<li key={item.date}>{item.date}</li>)
    });
  }

    render(){
      const {handleSubmit} = this.props;
      return (
        <div>{this.props.initialValues.date}
          <h3>Nouvelle enquête: Sujet: {this.state.subject_number}</h3>
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
            <div className="row">
                <Field name="survey_date" label="Date de Consultation"   type="text" component="input"></Field>
            </div>
            <div className="row">
              <Field name="comment" label=" Commentaire" component="input"></Field>
            </div>


            <div className="row">
              <Calendar
                onChange={(value)=>{this.newDiary(value)}}
              />
            </div>

            <ul className="collection-list">
              {this.renderDayList()}
            </ul>

            <button className="btn">Enregistrer</button>

          </form>
        </div>

      )
    }
}
/*      <button className="btn">Create</button>
      <Link to={"/survey/"+this.state.subject_number} className="btn ">Cancel</Link>*/

function validate(values ){
  const errors = {};
  console.log(values);
  return errors;
}

SurveyForm = reduxForm({
  validate,
  form:'addSurvey'
})(SurveyForm);

SurveyForm =   connect(
    state => ({
    initialValues: state.survey.survey, // pull initial values from account reducer
    survey : state.survey
  }),{addSurvey,addSurveyDay}
  )(SurveyForm);

export default SurveyForm;
