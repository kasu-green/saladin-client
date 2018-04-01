

import React, {Component} from 'react';

import  _ from 'lodash';


export default class Header extends Component{

  renderBack(backTo){
    const{history} = this.props;
    if(_.isUndefined(backTo) ){
      return (<img src="/img/salad.png" alt="logo Saladin"/>)
    }else{
      return (<img onClick={backTo} src="/img/ico-back.png" />)
    }
  }

  render(){
    const{backTo,title} = this.props;
    return (

      <header>
        <div className="flex flex-column just-center">
        <nav className="flex align-center just-between">
          <div className="flex">
            {this.renderBack(backTo)}
          </div>
          <div className="flex">
            <h2 className="self-center">{title}</h2>
          </div>
          <div className="flex">
            <div id="btnLinksList"></div>
            <button id="logout">logout</button>
          </div>
        </nav>
        </div>
      </header>
    );
  }
}
