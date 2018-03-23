import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import { connect } from 'react-redux';


class DiaryForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      subject_number:this.props.match.params.subject_number,
      diary_date:this.props.match.params.diary_date
    };

    
    debugger;
  }

  render(){
    return (
      <h3>Carnet du {this.state.diary_date}</h3>

    );
  }
}

DiaryForm =   connect(
    state => ({
    survey : state.survey
  }),null
)(DiaryForm);

export default DiaryForm;
