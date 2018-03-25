import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchDiary,addIngesta} from '../actions';

import DiaryForm from './diary-form';
class Diary extends Component {
  constructor(props){
    super(props);


  }

  componentDidMount(){


    if(typeof this.props.match.params.survey_id!="undefined"){
      this.props.fetchDiary(this.props.match.params.diary_date,this.props.match.params.survey_id);
    }
  }
  onSubmit(values){
    console.log('should add ingesta');
    console.log(values);
    // alter the current diary state and submit it
    const {food_id,quantity,breakdown} = values;
    this.props.addIngesta(this.props.match.params.survey_id,this.props.match.params.diary_date,values);
  //  this.props.diary.
  }
  render(){
    return (
      <div>
      <h3>Carnet du </h3>
      <DiaryForm onSubmit={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}

Diary =   connect(
    state => ({
    survey : state.survey,
    diary: state.diary
  }),{fetchDiary,addIngesta}
)(Diary);

export default Diary;
