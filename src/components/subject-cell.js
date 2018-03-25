
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectSubject} from '../actions';

class SubjectCell extends Component{

  selectSubject(){
    this.props.selectSubject(this.props.subject);
    this.props.history.push('/survey/');
  }

  render(){

    return (<li className="collection-item" key={this.props.key}>
              <div>
                {this.props.subject.number}
                {this.props.subject.custom_field}
                {this.props.subject.last_survey}

                  <i className="material-icons">delete</i>
                    <a onClick={(e)=>{e.preventDefault(); this.selectSubject()}} className="secondary-content">
                      <i className="material-icons">navigate_next</i>
                    </a>
              </div>
            </li>)

  }
}


SubjectCell = connect(null,{selectSubject})(SubjectCell);

export default SubjectCell;
