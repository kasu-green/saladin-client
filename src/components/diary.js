import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchDiary,addIngesta,fetchComponents} from '../actions';
import {availableBreakdown,_translate} from '../config';
import DiaryForm from './diary-form';
import Header from './header';
import moment from 'moment';

class Diary extends Component {
  constructor(props){
    super(props);


  }

  componentDidMount(){

    this.props.fetchComponents();
    const {subject_id,survey_id,diary_date} = this.props.match.params;
    if(typeof this.props.match.params.survey_id!="undefined"){
      this.props.fetchDiary(subject_id,survey_id,diary_date);
    }
  }
  onSubmit(values){
    console.log('should add ingesta');
    console.log(values);
    // alter the current diary state and submit it
      const {subject_id,survey_id,diary_date} = this.props.match.params;
    const {food_id,quantity,breakdown} = values;
    this.props.addIngesta(subject_id,survey_id,diary_date,values);
  //  this.props.diary.
  }

  renderFoodStat(components){

    //
    return components.map((item)=>{

      let componentTranslation = 'not found';
      let componentUnitTranslation ="N/A";
      if(this.props.components[item.component]){
        componentTranslation = _translate(this.props.locale.language,this.props.components[item.component].translation,'name');
        componentUnitTranslation = _translate(this.props.locale.language,this.props.components[item.component].translation,'unit');
      }
      return (<span key={item.component}>
        {componentTranslation} {item.qty} {componentUnitTranslation},&nbsp;
        </span>);
    });


  }

  renderComponent(component){
    let componentTranslation = 'not found';
    let componentUnitTranslation ="N/A";
    if(this.props.components[component.component]){
      componentTranslation = _translate(this.props.locale.language,this.props.components[component.component].translation,'name');
      componentUnitTranslation = _translate(this.props.locale.language,this.props.components[component.component].translation,'unit');
    }
    return (<span key={component.component}>
      {componentTranslation} {component.qty} {componentUnitTranslation}
      </span>);
  }

  renderIngesta(ingesta){
    return ingesta.map((item)=>{

      return (
        <li className="food" key={item._id}>
          <span className="food_name">{_translate(this.props.locale.language,item.food.translation,'name')}</span>
          &nbsp;<span className="food_quantity">{item.qty} g</span>
          <div className="food_stats">{this.renderFoodStat(item.components)}</div>
        </li>)
    });
  }
  renderDiary(diary){

    return _.map(diary,(breakdown,key)=>{
      return (
        <ul key={breakdown._id}>

          <li  className="breakdown">
            <span>{_translate(this.props.locale.language,availableBreakdown[key].translation,'name')}</span>
            <span className="food_stats">{this.renderFoodStat(breakdown.summary)}</span></li>
          {this.renderIngesta(breakdown.ingesta)}
        </ul>
      )
    });
  }

  renderSummary(){
    return _.map(this.props.diary.summary,(summary)=>{
      debugger;
      return (<li key={summary.component}>{this.renderComponent(summary)}</li>)
    });
  }
  render(){
    const {subject_id,survey_id,diary_date} = this.props.match.params;
    let date = moment(diary_date).format(this.props.locale.dateFormat);
    return (
      <div>
        <Header title={"Carnet Alimentaire "+date} backTo={()=>{this.props.history.push(`/survey/${subject_id}/edit/${survey_id}`)}}/>
        <div className="header-wrapper">
        <DiaryForm onSubmit={this.onSubmit.bind(this)}/>
        {this.renderDiary(this.props.diary.diary)}

        <h3>Résumé du jour</h3> <br/>
        <ul className="summary">
          {this.renderSummary()}
        </ul>
        </div>
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
