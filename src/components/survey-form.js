import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {addSurvey,addSurveyDay,fetchSurvey} from '../actions';
import 'react-widgets/dist/css/react-widgets.css';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Calendar } from 'react-widgets';

Moment.locale('fr');
momentLocalizer();
class SurveyForm extends Component {
  constructor(props){
    super(props);
  //
    this.state = {
      subject_id:this.props.match.params.subject_id,
    };

  //
  }

  componentDidMount(){

    let creating = false;
    debugger;
    //if(typeof this.props.match.params.survey_id!="undefined"){
      this.props.fetchSurvey(this.props.match.params.subject_id,this.props.match.params.survey_id);
    //}
  }
  componentWillReceiveProps(newProps){

    console.log(this.props.match.params);
    if(this.props.match.params.survey_id != newProps.match.params.survey_id){
      this.props.fetchSurvey(newProps.match.subject_id,newProps.match.survey_id);
    }

    if(this.state.subject_id != newProps.match.params.subject_id){
      this.setState({subject_id:newProps.match.params.subject_id});
    }
    //this.setState({creating:false,survey_id:this.props.match.params.survey_id});
  }

  submitForm(values){
    const {subject_id} = this.props.match.params.subject_id;
    //e.preventDefault();
    console.log(values);
    this.props.addSurvey(this.state.subject_id,values).then((survey)=>{
      this.props.history.push('/survey/'+this.state.subject_id+'/edit/'+survey.payload.data._id);

    });
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

    return (<div>
          <DatePicker {...input} {...rest} dateFormat="DD/MM/YYYY" selected={defaultValue} />
          {touched && error && <span>{error}</span>}
    </div>);
  };
/*
  handleChange(date) {
    console.log(date);

    this.setState({dateToAdd:date});
    this.props.addSurveyDay(date.format('YYYY-MM-DD'));

  }
*/
  newDiary(date){

    this.props.addSurveyDay(date,this.props.match.params.subject_id,this.props.survey._id);
    console.log(date);
  }
  renderDiariesList(){

    return this.props.survey.diaries.map((item)=>{
      let date = Moment(item.date).format('DD-MM-YYYY');
      return (<li key={item.date}><Link to={"/diary/"+this.props.match.params.subject_id+"/"+this.props.match.params.survey_id+"/"+date}>{date}</Link> {item.diary.length>0? item.diary.length+" entrée(s)" :"aucune entrée"}</li>)
    });
  }
  renderDiary(){
    if(this.props.survey._id=="-1"){
      return (<div></div>);
    }
    return (
      <div>
        <div className="row">
        <Calendar
          onChange={(value)=>{this.newDiary(value)}}
        />
      </div>

      <ul className="collection-list">
        {this.renderDiariesList()}
      </ul>
    </div>);
  }
    render(){

      const {handleSubmit} = this.props;
      return (
        <div>{this.props.initialValues.date}
          <h3>Nouvelle enquête: Sujet: {this.state.subject_id}</h3>
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
            <div className="row">
                <Field name="date" placeholder="Commentaire" label="Date de Consultation"   type="text" component="input"></Field>
            </div>
            <div className="row">
              <Field name="comment" placeholder="Commentaire" label=" Commentaire" component="input"></Field>
            </div>




            <button className="btn">{this.props.survey._id == -1 ? "Créer": "Enregistrer"}</button>
            {this.renderDiary()}
          </form>
        </div>

      )
    }
}
/*      <button className="btn">Create</button>
      <Link to={"/survey/"+this.state.subject_id} className="btn ">Cancel</Link>*/

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
    initialValues: state.survey, // pull initial values from account reducer
    survey : state.survey,
    subject:state.subject
  }),{addSurvey,addSurveyDay,fetchSurvey}
  )(SurveyForm);

export default SurveyForm;
