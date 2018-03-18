
import React, {Component} from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';


export default function render(props){
  console.log(props);
  return (<li className="collection-item" key="this.props.key">
            <div>
             du <Moment format="DD/MM/YYYY">{props.survey.date_start || "N/A"}</Moment> au <Moment format="DD/MM/YYYY">{props.survey.date_end || "N/A"}</Moment>

              <i className="material-icons">navigate_next</i>

            </div>
          </li>)
}
