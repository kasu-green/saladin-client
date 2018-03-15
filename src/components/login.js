import React, {Component} from 'react';



export default class Login extends Component{
  constructor(props){
    super(props);

  }
  onFormSubmit (event){
      event.preventDefault();
      window.location.href='/subjects' ;
  }
  render(){
    return (
      <section className="cover flex flex-column align-center just-center">
        <h1>Bienvenue sur Saladin !</h1>
        <form onSubmit={this.onFormSubmit} className="flex flex-column">
          <input className="email" type="text" placeholder="email"/>
          <input className="password" type="password" placeholder="password"/>
          <button className="submit">Se connecter</button>
          <p id="switchForm">
            Si vous ne possédez pas de compte,<br/>
            <span className="underline">cliquez-ici</span>
          </p>
        </form>

      </section>)
  }
}
