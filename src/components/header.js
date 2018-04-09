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
        <i className="material-icons">perm_identity</i>
      </Link>
    </div>)
    }
  }
  render(){
    const{title,noTools} = this.props;
    return (

      <header>
        <div className="flex flex-column just-center">
        <nav className="flex align-center just-between">
          <div className="flex">
            {this.renderBack()}
          </div>
          <div className="flex">
            <h2 className="self-center">{title}</h2>
          </div>
          <div className="flex">
          {this.renderTools()}


          </div>
        </nav>
        </div>
      </header>
    );
  }
}
