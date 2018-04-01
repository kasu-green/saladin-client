

import React, {Component} from 'react';




export default class Header extends Component{


  render(){
    return (

      <header>
        <nav className="flex align-center just-between">
          <div className="flex">
            <img src="/img/salad.png" alt="logo Saladin"/>

          </div>
          <div className="flex">
            <h2 className="self-center">{this.props.title}</h2>
          </div>
          <div className="flex">
            <div id="btnLinksList"></div>
            <button id="logout">logout</button>
          </div>
        </nav>
      </header>
    );
  }
}
