import React, {Component} from 'react';
import { connect } from 'react-redux';
import {_translate} from '../config';
import CollectionItem from './collection-item';

class FoodSummary extends Component{
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

  componentName(component){

    let componentTranslation = 'not found';
    //debugger;
    if(this.props.components[component]){
      componentTranslation = _translate(this.props.locale.language,this.props.components[component].translation,'name');
    }
    return componentTranslation;
  }
  componentUnit(component){

    let componentTranslation = 'N/A';
    //debugger;
    if(this.props.components[component]){
      componentTranslation = _translate(this.props.locale.language,this.props.components[component].translation,'unit');
    }
    return componentTranslation;
  }

  render(){
    //debugger;
    var summary = this.props.summary;
    if(this.props.preset){
      summary = _.remove(summary, (n)=> {
      //  debugger;
        var value =  _.indexOf(this.props.preset.components, n.component ) == -1;
        return value;
      });
    }
    if(this.props.inline){
      return (<span>
        {_.map(this.props.summary,(summary)=>{
          return (
            <span key={summary.component}>
              {this.componentName(summary.component)} {summary.qty.toFixed(2)} {this.componentUnit(summary.component)},&nbsp;
              </span>)
        }
      )}
    </span>);

    }else{
      return (
        <ul className="collection">
          {_.map(this.props.summary,(summary)=>{
              return (
              <li key={summary.component} className="collection-item" >
                <CollectionItem   text={this.componentName(summary.component)} subtext="" centerText={summary.qty.toFixed(2)+" "+this.componentUnit(summary.component)}/>
              </li>)
            }
          )}
        </ul>
      )
    }
  }

}
/*
FoodSummary =   connect(
    state => ({
    locale:state.locale,
    components:state.components
  }),null
)(FoodSummary);*/
export default FoodSummary
