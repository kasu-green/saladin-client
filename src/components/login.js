import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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

  renderForm(){
    const {handleSubmit} = this.props;
    if(!this.props.auth.authenticated){
      return (
        <div>
          <h1>Bienvenue sur Saladin !</h1>

          <span>{this.props.auth.error}</span>
          <form onSubmit={handleSubmit(this.submitForm.bind(this))}  className="flex flex-column">
            <Field name="email" placeholder="E-mail address"  component="input" type="input"/>
            <Field name="password" placeholder="Password"   component="input" type="password" />
            <button className="submit">Se connecter</button>
            <p id="switchForm">
              Si vous ne possédez pas de compte,<br/>
            <Link to="/register">cliquez-ici</Link>
            </p>
          </form>
        </div>)
    }
  }

  renderLogged(){
    if(this.props.auth.authenticated){
      return(
        <div>Welcome Back ! <br/>
          <Link to="/subjects">Cliquez ici pour continuer</Link>
         </div>


      )
    }
  }

  render(){

    return (
      <section className="cover flex flex-column align-center just-center">
        {this.renderForm()}
        {this.renderLogged()}
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
  form:'login',
})(Login);

Login = connect(state=>( {  auth: state.auth }),{authenticate})(Login);

export default Login
