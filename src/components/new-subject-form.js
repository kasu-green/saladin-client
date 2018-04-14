import React, {Component} from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Moment from 'moment';
import CollectionItem from './collection-item';
import _ from 'lodash';
import {fetchPresets} from '../actions';
import CheckboxGroup from './checkboxgroup';

class SubjectForm extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
  
  }

  resetForm(){
    this.props.reset() ;
    this.props.cancelForm();
  }

  submitForm(values){
    this.props.submitForm(values);
  }

  renderOptions(){
    return _.map(this.props.presets,(preset)=>{
      return (
          <option value={preset._id} key={preset._id}>{preset.name}</option>
        )
    });
  }


  render(){

    const {handleSubmit} = this.props;

      return (
        <div className="preset-form">
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
            <div className="row">
                <Field name="_id" placeholder="-" label="Numero" disabled  type="text" component="input"></Field>
            </div>
            <div className="row">
              <Field name="desc" className="" placeholder="Description" label="Description" component="input"></Field>
            </div>
            <Field name="preset"  className="breakdown"  component="select">
              {this.renderOptions()}
            </Field>
            <button className="btn main">Enregistrer</button>
            <button className="btn main" type="button" onClick={this.resetForm.bind(this)}>Annuler</button>
          </form>
        </div>

      )

  }
}


function validate(values ){
  const errors = {};
  console.log(values);
  return errors;
}


const mapStateToProps = (state, ownProps) => {

    return {
        form: ownProps.name,
        initialValues: ownProps.subject,
        presets:state.presets,
        locale: state.locale,

        // other props...
    }
}

SubjectForm = compose(
    connect(mapStateToProps,{fetchPresets}),
    reduxForm({
      validate,
      enableReinitialize:true
        //other redux-form options...
    })
)(SubjectForm);


export default SubjectForm;
