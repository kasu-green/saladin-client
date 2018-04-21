import React, {Component} from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Moment from 'moment';

import _ from 'lodash';

class RegisterForm extends Component {
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

  render(){

    const {handleSubmit} = this.props;

      return (
        <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="register-form">
          <Field name="email" placeholder="Email" label="Email"  type="text" component="input"></Field>
          <Field name="password" className="" placeholder="Password" label="Description" type="password" component="input"></Field>
          <Field name="password_confirm" className="" placeholder="Password confirmation" label="Description" type="password"  component="input"></Field>
          <div className="flex just-between align-base">
            <button className="cancel" type="button" onClick={this.resetForm.bind(this)}>Annuler</button>
            <button className="signup">Inscription</button>
          </div>
        </form>
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

        // other props...
    }
}

RegisterForm = compose(
    connect(mapStateToProps,null),
    reduxForm({
      validate,
      enableReinitialize:true
        //other redux-form options...
    })
)(RegisterForm);


export default RegisterForm;
