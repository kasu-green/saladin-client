import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {addSurvey,addSurveyDay,fetchSurvey,updateSurvey} from '../actions';
import 'react-widgets/dist/css/react-widgets.css';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
//import { Calendar } from 'react-widgets';
import Calendar from 'react-calendar';
import Header from './header';
import SurveyForm from './survey-form';


Moment.locale('fr');
momentLocalizer();

class Survey extends Component {
  constructor(props){
    super(props);

    this.state ={
      loaded : false,
      error: false,
      pickedDate: new Date()
    }

  }

  reloadComponentData (){
    const {subject_id,survey_id,action} = this.props.match.params;
    if(action == 'edit'){

      const promise = this.props.fetchSurvey(subject_id,survey_id);

      debugger;
      promise.then(()=>{
        this.setState({loaded:true});
      });
    }
  }

  componentDidMount(){
    console.log('mount');
    this.reloadComponentData();
    //if(typeof this.props.match.params.survey_id!="undefined"){
    //  this.props.fetchSurvey(this.props.match.params.subject_id,this.props.match.params.survey_id);
    //}
  }

  componentWillReceiveProps(newProps){
    console.log('props have changed ', newProps);
    /*const {subject_id,survey_id,action} = this.props.match.params;

    if(subject_id!=_subject_id || survey_id !=_survey_id || action!= _action){
      this.reloadComponentData();
    }*/
    /*console.log(this.props.match.params);
    if(this.props.match.params.survey_id != newProps.match.params.survey_id){
      this.props.fetchSurvey(newProps.match.subject_id,newProps.match.survey_id);
    }
*/  if(newProps.match.params.action != this.props.match.params.action){
    //  this.reloadComponentData();
    }
  }

  submitForm(values){

    const {subject_id,survey_id,action} = this.props.match.params;
    //e.preventDefault();
    debugger;
    console.log(values);
    if(action=='add'){
    this.props.addSurvey(subject_id,values).then((survey)=>{
      this.props.history.push('/survey/'+subject_id+'/edit/'+survey.payload.data._id);

    });
    }else{
    this.props.updateSurvey(subject_id,survey_id,values).then((survey)=>{

    });
    }
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

  newDiary(date){
    debugger;
    this.setState({pickedDate:date});
    this.props.addSurveyDay(date,this.props.match.params.subject_id,this.props.survey._id);
    console.log(date);
  }

  renderDiariesList(){

    return this.props.survey.diaries.map((item)=>{
      let date = Moment(item.date).format('YYYY-MM-DD');
        let display_date = Moment(item.date).format('DD/MM/YYYY');
      return (<li key={item.date}><Link to={"/diary/"+this.props.match.params.subject_id+"/"+this.props.match.params.survey_id+"/"+date+"Z"}>{display_date}</Link> {item.diary.length>0? item.diary.length+" entrée(s)" :"aucune entrée"}</li>)
    });
  }

  shouldDisableTile(calendar){

  }

  renderDiary(){
    if(this.props.survey._id=="-1"){
      return (<div></div>);
    }

    var pickedDates = _.map(this.props.survey.diaries,(diary)=>{
      return Moment(diary.date).startOf('day');
    });

    debugger;
    return (
      <div className="survey">
        <div className="row">
          <Calendar
            onChange={(value)=>{this.newDiary(value)}}
            value={this.state.pickedDate}
            tileDisabled= {(date)=>{
              var found = _.find(pickedDates, function(item) {
                return item.isSame(Moment(date.date).startOf('day'));
              });

              return ! _.isUndefined(found);
            //debugger;
            }}
          />
        </div>

        <ul className="collection-list">
          {this.renderDiariesList()}
        </ul>
     </div>
   );
  }
  render(){
    const {subject_id} = this.props.match.params;
    const {handleSubmit} = this.props;
    return (
      <div>
        <Header title={"Enquête alimentaire:"+ subject_id}></Header>
        <div className="header-wrapper">
        <SurveyForm onSubmitForm={this.submitForm.bind(this)}/>
        {this.renderDiary()}
        </div>
      </div>

    )
  }
}

Survey =   connect(
    state => ({
    survey : state.survey,
    subject:state.subject
  }),{addSurvey,addSurveyDay,fetchSurvey,updateSurvey}
  )(Survey);

export default Survey;
