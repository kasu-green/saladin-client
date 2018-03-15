
import React, {Component} from 'react';




export default function render(props){

  return (<li className="collection-item">
            <div>
              {props.subject.number}
              <a href="#" className="secondary-content">
                <i className="material-icons">delete</i>
                <i className="material-icons">navigate_next</i>
              </a>
            </div>
          </li>)
}
