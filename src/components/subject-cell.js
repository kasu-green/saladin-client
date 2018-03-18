
import React, {Component} from 'react';

import {Link} from 'react-router-dom';


export default function render(props){
  console.log(props);
  return (<li className="collection-item" key="this.props.key">
            <div>
              {props.subject.number}
              {props.subject.custom_field}
              {props.subject.last_survey}
              
                <i className="material-icons">delete</i>
                  <Link to ={"/survey/"+props.subject.number} className="secondary-content">
                    <i className="material-icons">navigate_next</i>
                  </Link>
            </div>
          </li>)
}
