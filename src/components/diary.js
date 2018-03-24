import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchDiary} from '../actions';

import DiaryForm from './diary-form';
class Diary extends Component {
  constructor(props){
    super(props);


    debugger;
  }

  onFoodSelection(){

  }

  componentDidMount(){


    if(typeof this.props.match.params.survey_id!="undefined"){
      this.props.fetchDiary(this.props.match.params.diary_date,this.props.match.params.survey_id);
    }
  }

  render(){
    return (
      <div>
      <h3>Carnet du </h3>
      <DiaryForm/>
      </div>
    );
  }
}

Diary =   connect(
    state => ({
    survey : state.survey,
    diary: state.diary
  }),{fetchDiary}
)(Diary);

export default Diary;
