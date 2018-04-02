
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectSubject} from '../actions';
import CollectionItem from './collection-item';
class SubjectCell extends Component{

  selectSubject(){
    this.props.selectSubject(this.props.subject);
    this.props.history.push('/survey/'+this.props.subject._id);
  }

  render(){
    return (<li className="collection-item" key={this.props.key}>
    <CollectionItem text={this.props.subject._id} subtext={this.props.subject.custom_field || '-'} onClick={(e)=>{e.preventDefault(); this.selectSubject()}} icon="navigate_next"/>

              
            </li>)

  }
}


SubjectCell = connect(null,{selectSubject})(SubjectCell);

export default SubjectCell;
