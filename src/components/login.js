import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {authenticate} from '../actions';

class Login extends Component{
  constructor(props){
    super(props);

  }
  submitForm (values){
    //  event.preventDefault();
    //  window.location.href='/subjects' ;
    this.props.authenticate(values.email,values.password);
  }
  render(){
    const {handleSubmit} = this.props;
    return (
      <section className="cover flex flex-column align-center just-center">
        <h1>Bienvenue sur Saladin !</h1>
        <form onSubmit={handleSubmit(this.submitForm.bind(this))}  className="flex flex-column">
          <Field name="email" placeholder="E-mail address"  component="input" type="input"/>
          <Field name="password" placeholder="Password"   component="input" type="password" />

          <button className="submit">Se connecter</button>
          <p id="switchForm">
            Si vous ne possédez pas de compte,<br/>
            <span className="underline">cliquez-ici</span>
          </p>
        </form>

      </section>)
  }
}

function validate(values ){
  const errors = {};
  if(!values.email){
    errors.email = "Enter an email address";
  }
  return errors;
}

Login = reduxForm({
  validate,
  form:'login'
})(Login);

Login = connect(null,{authenticate})(Login);

export default Login
