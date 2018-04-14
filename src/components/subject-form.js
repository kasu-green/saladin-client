import React, {Component} from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Moment from 'moment';
import CollectionTitle from './collection-title';
import _ from 'lodash';
import {fetchPresets} from '../actions';
import CheckboxGroup from './checkboxgroup';

class SubjectForm extends Component {
  constructor(props){
    super(props);
    let edit = false;
    if(_.isUndefined(this.props.edit)){
      edit = true;
    }else{
      edit = this.props.edit;
    }
    this.state = {
      edit:edit
    }
  }

  componentDidMount(){
  //  this.props.fetchPresets();
  //  this.props.reset();
  }

  resetForm(){
    this.props.reset() ;
    this.setState({edit:false});
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
    if(this.state.edit){
    const {handleSubmit} = this.props;

      return (
        <div className="preset-form">
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
            <div className="row">
                <Field name="_id" placeholder="-" label="Numero" disabled  type="text" component="input"></Field>
            </div>
            <div className="row">
              <Field name="custom_field" className="" placeholder="Description" label="Description" component="input"></Field>
            </div>
            <Field name="preset"  className="breakdown"  component="select">
              {this.renderOptions()}
            </Field>
            <button className="btn main">Enregistrer</button>
            <button className="btn main" type="button" onClick={this.resetForm.bind(this)}>Annuler</button>
          </form>
        </div>

      )
    }else{
      return (

        <CollectionTitle title={"Sujet: "+this.props.subject._id} onClick={()=>{this.setState({edit:true})}}/>
      )
    }
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
