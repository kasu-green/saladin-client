import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FoodSearch from './food-search';
import {availableBreakdown,_translate} from '../config';
import _ from 'lodash';
class DiaryForm extends Component {
    constructor(props){
      super(props);

    }


    submitForm(values){
      this.props.onSubmit(values);
    }


    renderOptions(){
      return _.map(availableBreakdown,(breakdown,key)=>{
        return (
            <option value={key} key={key}>{_translate(this.props.locale.language,breakdown.translation,'name')}</option>
          )
      });
    }
    renderField (field){
      debugger;
      const {
        input,
        label,
        className,
        placeholder,
        type,
        props,
        rest,
        meta: { touched, error, warning }
      } = field;
      return (
        <div>
          <input {...input} placeholder={label} type={type}  {...props} {...rest} placeholder={placeholder} className={className}/>
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}

      </div>)
    }
    render(){

      const {handleSubmit} = this.props;
      return (
        <div className="diary-form">
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
          <div className="row">

              <Field name="food" component={FoodSearch}> </Field>
            </div>

            <div className="row">
                <Field name="qty" className="qty" placeholder="Quantité (grammes / ml)"  type="text" component={this.renderField}></Field>
            </div>
            <div className="row">
              <Field name="breakdown" className="breakdown" component="select">
                {this.renderOptions()}
              </Field>
            </div>
            <div className="row">
              <button>ajouter</button>
            </div>
          </form>
        </div>

      )
    }
}
/*      <button className="btn">Create</button>
      <Link to={"/survey/"+this.state.subject_number} className="btn ">Cancel</Link>*/

function validate(values ){
  const errors = {};
  if(!values.food){
    errors.food = "Sélectionnez un aliment en cliquant sur un élément déroulant";
  }
  if(!values.qty){
    errors.qty = "Select a quantity";
  }
  if(isNaN(values.qty)){
    errors.qty = "Enter a number (décimale = .)";
  }
  return errors;
}

DiaryForm = reduxForm({
  validate,
  form:'ingesta',
  initialValues:{
    breakdown:"breakfast"
  }
})(DiaryForm);

DiaryForm =   connect((state)=>{
  return {locale:state.locale}
},null)(DiaryForm);

export default DiaryForm;
