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

    render(){

      const {handleSubmit} = this.props;
      return (
        <div>
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
          <div className="row">

              <Field name="food" component={FoodSearch}> </Field>
            </div>

            <div className="row">
                <Field name="qty" placeholder="Quantité (grammes / ml)"  type="text" component="input"></Field>
            </div>
            <div className="row">
              <Field name="breakdown" component="select">
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
    errors.food = "Select a food";
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
