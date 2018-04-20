import {Link} from 'react-router-dom';

import React, {Component} from 'react';

import  _ from 'lodash';


export default class Header extends Component{

  renderBack(){
    const{backTo} = this.props;
    if(_.isUndefined(backTo) ){
      return (<img src="/img/salad.png" alt="logo Saladin"/>)
    }else{
      return (<img onClick={backTo} src="/img/ico-back.png" />)
    }
  }
  renderTools(){
    const{noTools} = this.props;
    if(_.isUndefined(noTools) || !noTools){
      return (
        <div className="header_buttons">
          <Link to="/profile">
            <i className="material-icons">person</i>
          </Link>
        </div>
      )
    }
  }
  render(){
    const{title,noTools} = this.props;
    return (

      <header className="flex flex-column just-center">

          <nav className="flex align-center just-between">
            <div className="flex align-start">
              {this.renderBack()}
              <h2>{title}</h2>
            </div>
            <div>
              {this.renderTools()}
            </div>
          </nav>

      </header>
    );
  }
}
