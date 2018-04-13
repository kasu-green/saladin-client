
import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import CollectionItem from './collection-item';

export default function render(props){
  console.log(props);
  return (
      <li className="collection-item" key="this.props.key">

        <CollectionItem
          text={"Enquête du "+moment(props.survey.date).format('DD/MM/YYYY')}
          subtext={props.survey.comment}
          onClick={props.onClick}
          icon="navigate_next"
        />
      </li>)
}
