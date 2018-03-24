
import React, {Component} from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';


export default function render(props){
  console.log(props);
  return (<li className="collection-item" key="this.props.key">
            <div>
             Enquête du <Moment format="DD/MM/YYYY">{props.survey.date || "N/A"}</Moment>

              {props.survey.comment}
              <Link to={"/survey/"+props.subject_number+"/edit/"+props.survey._id}>
                <i className="material-icons">navigate_next</i>
              </Link>
            </div>
          </li>)
}
