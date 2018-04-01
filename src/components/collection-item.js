import _ from 'lodash';
import React,{Component} from 'react';


export default class CollectionItem {

  render(){
    const {text,subtext,icon,onClick} = this.props;
    return (
      <div className="collection-item flex align-center just-between">
        <div className="flex wrap flex-column">
          <div>{text}</div>
          <div className="custom_field">{subtext || ' '}</div>
        </div>
        <div>text center</div>
        <div className="">
          <a onClick={onClick} className="secondary-content">
            <i className="material-icons">navigate_next</i>
          </a>
        </div>
      </div>
    )
  }
}
