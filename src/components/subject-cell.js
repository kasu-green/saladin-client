
import React, {Component} from 'react';




export default function render(props){
  console.log(props);
  return (<li className="collection-item">
            <div>
              {props.subject.identifier}
              {props.subject.custom_field}
              {props.subject.last_survey}
              <a href="#" className="secondary-content">
                <i className="material-icons">delete</i>
                <i className="material-icons">navigate_next</i>
              </a>
            </div>
          </li>)
}
