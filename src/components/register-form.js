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
        <div className="preset-form">
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="col s12">
            <div className="row">
                <Field name="email" placeholder="Email" label="Email"  type="text" component="input"></Field>
            </div>
            <div className="row">
              <Field name="password" className="" placeholder="Password" label="Description" type="password" component="input"></Field>
            </div>
            <div className="row">
              <Field name="password_confirm" className="" placeholder="Password confirmation" label="Description" type="password"  component="input"></Field>
            </div>

            <button className="btn main">Inscription</button>
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
