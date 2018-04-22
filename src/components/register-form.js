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
        <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="register-form">
          <Field name="email" placeholder="Email" label="Email"  type="text" component={this.renderField}></Field>
          <Field name="password" className="" placeholder="Password" label="Description" type="password" component={this.renderField}></Field>
          <Field name="password_confirm" className="" placeholder="Password confirmation" label="Description" type="password"  component={this.renderField}></Field>
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
  if(values.password != values.password_confirm){
    errors.password_confirm= 'Les mots de passes ne correspondent pas'
  }
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
