import React, {Component} from 'react';



export default function (props){
  return (


    <section className="cover flex flex-column align-center just-center">

      <h1>Bienvenue sur Saladin !</h1>
      <form onSubmit={(e)=>{e.preventDefault}} id="loginForm" className="flex flex-column">
        <input className="email" type="email" placeholder="email"/>
        <input className="password" type="password" placeholder="password"/>
        <button className="submit" type="submit">Se connecter</button>
        <p id="switchForm">
          Si vous ne possédez pas de compte,<br/>
          <span className="underline">cliquez-ici</span>
        </p>
      </form>

    </section>)
}
