import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchDiary,addIngesta,fetchComponents} from '../actions';
import {availableBreakdown,_translate} from '../config';
import DiaryForm from './diary-form';
class Diary extends Component {
  constructor(props){
    super(props);


  }

  componentDidMount(){

    this.props.fetchComponents();
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

  renderFoodStat(components){

    //
    return components.map((item)=>{

      let componentTranslation = 'not found';
      let componentUnitTranslation ="N/A";
      if(this.props.components[item.component_id]){
        componentTranslation = _translate(this.props.locale.language,this.props.components[item.component_id].translation,'name');
        componentUnitTranslation = _translate(this.props.locale.language,this.props.components[item.component_id].translation,'unit');
      }
      return (<div key={item.component_id}>
        {componentTranslation} {item.qty} {componentUnitTranslation}
        </div>);
    });


  }

  renderIngesta(ingesta){
    return ingesta.map((item)=>{
        
      return (
        <li className="food" key={item._id}>
          <div className="food_name">{_translate(this.props.locale.language,item.food_id.translation,'name')}</div>
          <div className="food_quantity">{item.qty} g/ml</div>
          <div className="food_stats">{this.renderFoodStat(item.components)}</div>
        </li>)
    });
  }
  renderDiary(diary){

    return _.map(diary,(breakdown,key)=>{
      return (
        <ul key={breakdown._id}>

          <li  className="breakdown">{_translate(this.props.locale.language,availableBreakdown[key].translation,'name')}</li>
          {this.renderIngesta(breakdown.ingesta)}
        </ul>
      )
    });
  }
  render(){
    return (
      <div>
        <h3>Carnet du </h3>
        <DiaryForm onSubmit={this.onSubmit.bind(this)}/>
        {this.renderDiary(this.props.diary.diary)}
      </div>
    );
  }
}

Diary =   connect(
    state => ({
    survey : state.survey,
    diary: state.diary,
    locale:state.locale,
    components:state.components
  }),{fetchDiary,addIngesta,fetchComponents}
)(Diary);

export default Diary;
