import React, {Component} from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { DateTimePicker } from 'react-widgets'
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import CollectionTitle from './collection-title';
import DatePicker from 'react-date-picker';

import {fetchPresets} from '../actions';
import _ from 'lodash';
Moment.locale('fr');
momentLocalizer();
class SurveyForm extends Component {
  constructor(props){
    super(props);

    let {edit} = props;

    if(_.isUndefined(edit)){
      edit = true;
    }
    this.state = {
      edit:edit
    }

  }

  componentDidMount(){
    this.props.fetchPresets();
  }



  submitForm(values){
    this.props.onSubmitForm(values);
    this.setState({edit:false});
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
    const {input:{value,onChange}, placeholder, defaultValue,rest, meta: {touched, error} }  = field;
    debugger;
    return (<div>
          <DatePicker locale="fr-FR" onChange={(date)=>{debugger;onChange}}  time={false} {...field.input} {...rest} onBlur={()=>{}} value={value}/>
          {touched && error && <span>{error}</span>}
    </div>);
  };
  renderOptions(){
    return _.map(this.props.presets,(preset)=>{
      return (
          <option value={preset._id} key={preset._id}>{preset.name}</option>
        )
    });
  }


  render(){

    const {handleSubmit} = this.props;
    if(this.state.edit){
      return (
        <div className="survey-form">

          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
            <div className="row">
                <Field name="_date" placeholder="Date" label="Date de Consultation"  type="text" component={this.renderDatePicker}></Field>
            </div>
            <div className="row">
              <Field name="comment" className="" placeholder="Commentaire" label=" Commentaire" component="input"></Field>
            </div>
            <div className="row">
              <Field name="preset" component="select">
                  {this.renderOptions()}
              </Field>
            </div>
            <button className="btn main">Enregistrer</button>
            <button className="btn main" type="button" onClick={()=>{this.setState({edit:false})}}>Annuler</button>
          </form>
        </div>

      )
    }else{
      //debugger;
      let display_date = Moment(this.props.survey.date).format(this.props.locale.dateFormat);
      return (<CollectionTitle onClick={()=>{this.setState({edit:true})}} title={"consultation "+display_date}/>)
    }
  }
}
/*      <button className="btn">Create</button>
      <Link to={"/survey/"+this.state.subject_id} className="btn ">Cancel</Link>*/

function validate(values ){
  const errors = {};
  console.log(values);
  return errors;
}


const mapStateToProps = (state, ownProps) => {

    return {
        form: ownProps.name,
        initialValues: ownProps.survey,
        presets:state.presets,
        locale: state.locale,

        // other props...
    }
}

SurveyForm = compose(
    connect(mapStateToProps,{fetchPresets}),
    reduxForm({
      validate,
      enableReinitialize:true
        //other redux-form options...
    })
)(SurveyForm);

export default SurveyForm;
